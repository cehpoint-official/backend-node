module.exports = {
    'newStudentDetails': newStudentDetails,
    'getUnapprovedStudents': getUnapprovedStudents,
    'getStudentCounts': getStudentCounts,
    'getStudentData': getStudentData,
    'approveStudent': approveStudent
}


const studentService = require('../services/StudentServices.js')
const clientPrefix = 'CS';
const crypto = require('crypto');

function newStudentDetails(req, res){
    const unique_id = clientPrefix + crypto.randomBytes(7).toString('hex');
    const body = req.body;
    body['id'] = unique_id;

    if (studentService.addNewStudent(body)){
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

async function getUnapprovedStudents(req, res){
    const unapproved_students = await studentService.getUnapprovedStudents();

    if(!unapproved_students){
        res.status(500).json({
            'ok': false,
            'message': 'unsuccessful'
        });
        return;
    }

    res.json({
        'ok': true,
        'message': 'success',
        'data': unapproved_students
    });
}

function getStudentCounts(req, res, next){
    studentService.getStudentCounts()
    .then(result=>{
        res.locals.counts = result;
        next();
    });
}

function getStudentData(req, res){
    studentService.getStudentData()
    .then(data => {
        res.json({
            'ok': true,
            'message': 'success',
            'data': data
        });
    })
    .catch(err => res.json({'ok': false, 'message': 'unsuccessful'}));
};

async function approveStudent(req, res){
    const {studentId, paymentLink, file} = req.body;
    try {
        await StudentModel.approveStudent(studentId);
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