const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static("./uploads"));

//multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const uploads = multer({ storage });

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
app.post('/approvestudent', uploads.single('proposal'), userMethods.approveStudent);
app.post('/approveclient', clientMethods.approveClient);


app.listen(5000, ()=>console.log('Server started'));