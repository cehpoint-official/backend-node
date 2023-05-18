const studentModel = require('../database/models/StudentModel.js');

module.exports = {
    addNewStudent,
    getUnapprovedStudents,
    getStudentCounts,
    getStudentData,
    approveStudent
}

async function addNewStudent(body){
    try{
        await studentModel.create(body);
        return true;
    } catch (err){
        console.log(err)
        return false;
    }
}

function getUnapprovedStudents(){
    try {
        return studentModel.find({'approvalStatus': false});
    } catch (err) {
        console.log(err);
        return null;
    }
}

function getStudentCounts(){
        return Promise.all([studentModel.countDocuments({}), studentModel.countDocuments({'approvalStatus': false})])
        .then(results=>({'studentCount': results[0], 'unapprovedStudentCount': results[1]}))
        .catch(err=>null);
}

function getStudentData(){
    return studentModel.find({});
}

async function approveStudent(id){
    try {
        await studentModel.updateOne(
            {'id': id},
            {'approvalStatus': true}
        );
    }
    catch (err) {
        console.log(err);
    }
}   