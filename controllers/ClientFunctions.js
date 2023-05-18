module.exports = {
    'newClientDetails': newClientDetails,
    'getUnapprovedClients': getUnapprovedClients,
    'getClientCounts': getClientCounts,
    'getClientData': getClientData,
    'approveClient': approveClient
}

const clientService = require('../services/ClientServices.js')
const clientPrefix = 'CC';
const crypto = require('crypto');
const ClientModel = require('../database/models/ClientModel.js');

function newClientDetails(req, res){
    const unique_id = clientPrefix + crypto.randomBytes(7).toString('hex');
    const body = req.body;
    body['id'] = unique_id;

    if (clientService.addNewClient(body)){
        res.status(201).json({
            'ok': true,
            'message': 'success',
            'key': unique_id
        });
        return;
    }

    res.status(500).json({
        'ok': false,
        'message': 'unsuccessful',
    });
    return;
}

async function getUnapprovedClients(req, res){
    const unapproved_clients = await clientService.getUnapprovedClients();

    if(!unapproved_clients){
        res.status(500).json({
            'ok': false,
            'message': 'unsuccessful'
        });
        return;
    }

    res.json({
        'ok': true,
        'message': 'success',
        'data': unapproved_clients
    });
}

function getClientCounts(req, res){
    clientService.getClientCounts()
    .then(result=>{
        let final_packet = {
            ...res.locals.counts,
            ...result
        };
        final_packet = { ...final_packet,
        "pendingJobCount": 7,
        "pendingInternCount": 8,
        "totalPendingPosts": 8+7,
        "totalEmployees": 15,
        "totalOngoingProjects": 10,
        "pendingProjects": 3,
        "premiumProjects": 8,
        "completed": 100
        }
        res.json({
            'ok': true,
            'message': 'success',
            'data': final_packet
        });
    })
    .catch(err=>res.status(500).json({'ok': false, 'message': 'unsuccessful'}));
}

function getClientData(req, res){
    ClientModel.getClientData()
    .then( data => {
        res.json({
            'ok': true,
            'message': 'success',
            'data': data
        });
    })
    .catch(err => res.json({'ok': false, 'message': 'unsuccessful'}));
}

async function approveClient(req, res){
    const {clientId, paymentLink, file} = req.body;
    try {
        await ClientModel.approveClient(clientId);
        res.json({
            'ok': true,
            'message': 'successful',
            'payment': paymentLink,
            'file': file
        });
    }
    catch (err) {
        res.json({
            'ok': false,
            'status': 'unsuccessful'
        });
    }
}