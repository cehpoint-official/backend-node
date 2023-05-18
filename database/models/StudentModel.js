const mongoose = require('mongoose');
const {Schema} = mongoose;

const studentSchema = new Schema({
    id: String,
    name: String,
    guardianName: String,
    phoneNumber: String,
    email: String,
    address: String,
    interest: String,
    goals: String,
    source: String,
    courseInterested: Boolean,
    parentSupport: Boolean,
    onlineComfortable: Boolean,
    approvalStatus: {
        type: Boolean,
        default: false
    }
});

const StudentModel = new mongoose.model('StudentCollection', studentSchema);
module.exports = StudentModel;