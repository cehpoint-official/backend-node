const mongoose = require('mongoose');
const {Schema} = mongoose;

const clientSchema = new Schema({
    id: String,
    name: String,
    companyName: String,
    phoneNumber: String,
    email: String,
    address: String,
    interest: String,
    goals: String,
    source: String,
    approvalStatus: {
        type: Boolean,
        default: false
    }
});

const ClientModel = new mongoose.model('ClientCollection', clientSchema);
module.exports = ClientModel;