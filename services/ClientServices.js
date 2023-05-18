const ClientModel = require('../database/models/ClientModel.js');
const clientModel = require('../database/models/ClientModel.js');

module.exports = {
    addNewClient,
    getUnapprovedClients,
    getClientCounts,
    getClientData,
    approveClient
}

async function addNewClient(body){
    try {
        await clientModel.create(body);
        return true;
    } catch (err){
        console.log(err)
        return false;
    }
}

function getUnapprovedClients(){
    try {
        return clientModel.find({'approvalStatus': false});
    } catch (err){
        console.log(err)
        return null;
    }
}

function getClientCounts(){
    return Promise.all([clientModel.countDocuments({}), clientModel.countDocuments({'approvalStatus': false})])
    .then(results=>({'clientCount': results[0], 'unapprovedClientCount': results[1]}))
    .catch(err=>null);
}

function getClientData(){
    return clientModel.find({});
}

async function approveClient(id){
    try {
        await ClientModel.updateOne(
            {'id': id},
            {'approvalStatus': true}
        );
    }
    catch (err) {
        console.log(err);
    }
}