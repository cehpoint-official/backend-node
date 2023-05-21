const StudentModel = require('../database/models/StudentModel.js');

module.exports = {
    addNewStudent,
    getUnapprovedStudents,
    getStudentCounts,
    getStudentData,
    approveStudent
}

async function addNewStudent(body){
    try {
        await StudentModel.create(body);
        return true;
    } catch (err){
        console.log(err)
        return false;
    }
}


function getUnapprovedStudents(){
    return StudentModel.findAll({'where': {'approvalStatus': false}})
    .then(obj => obj.map( val => val.toJSON()))
    .catch(() => null);
}

function getStudentCounts(){
    return Promise.all([StudentModel.count(), StudentModel.count({'where': {'approvalStatus': false}})])
    .then(results=>({'studentCount': results[0], 'unapprovedStudentCount': results[1]}))
    .catch(() => null);
}

function getStudentData(){
    return StudentModel.findAll()
    .then(obj => obj.map( val => val.toJSON()))
    .catch(() => null);
}

async function approveStudent(id){
    try {
        await StudentModel.update(
            {'approvalStatus': true},
            {'where' : {'id': id}}
        );
    }
    catch (err) {
        console.log(err);
    }
}