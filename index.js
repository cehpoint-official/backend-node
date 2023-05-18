const express = require('express');
const cors = require('cors');
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

//db
const db = require('./database/init.js');
//controllers
const userMethods = require('./controllers/StudentFunctions');
const clientMethods = require('./controllers/ClientFunctions');

//routes
app.get('/', (req, res) => {
    res.send('Api Functional');
});
app.post('/newstudentdetails', userMethods.newStudentDetails);
app.post('/newclientdetails', clientMethods.newClientDetails);
app.get('/getunapprovedclients', clientMethods.getUnapprovedClients);
app.get('/getunapprovedstudents', userMethods.getUnapprovedStudents);
app.get('/getcounts', userMethods.getStudentCounts, clientMethods.getClientCounts);
app.get('/getstudentdata', userMethods.getStudentData);
app.get('/getclientdata', clientMethods.getClientData);
app.post('/approvestudent', userMethods.approveStudent);
app.post('/approveclient', clientMethods.approveClient);


app.listen(5000, ()=>console.log('Server started'));