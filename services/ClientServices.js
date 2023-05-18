const ClientModel = require('../database/models/ClientModel.js');

module.exports = {
    addNewClient,
    getUnapprovedClients,
    getClientCounts,
    getClientData,
    approveClient
}

async function addNewClient(body){
    try {
        await ClientModel.create(body);
        return true;
    } catch (err){
        console.log(err)
        return false;
    }
}

function getUnapprovedClients(){
    return ClientModel.findAll({'where': {'approvalStatus': false}})
    .then(obj => obj.map(val => val.toJSON()))
    .catch(() => null);
}

function getClientCounts(){
    return Promise.all([ClientModel.count(), ClientModel.count({'where': {'approvalStatus': false}})])
    .then(results=>({'clientCount': results[0], 'unapprovedClientCount': results[1]}))
    .catch(() => null);
}

function getClientData() {
    return ClientModel.findAll()
    .then( obj => obj.map( val => val.toJSON()))
    .catch(() => null);
}

async function approveClient(id){
    try {
        await ClientModel.update(
            {'approvalStatus': true},
            {'where': {'id': id}}
        );
    }
    catch (err) {
        console.log(err);
    }
}