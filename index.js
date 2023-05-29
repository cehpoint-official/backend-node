const express = require('express');
const cors = require('cors');
const multer = require('multer');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static("./uploads"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

/**
 * @swagger
 * /newstudentdetails:
 *   post:
 *     summary: Create new student details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *              name: String
 *              guardianName: String
 *              phoneNumber: String
 *              email: String
 *              address: String
 *              interest: String
 *              goals: String
 *              source: String
 *              courseInterested: Boolean
 *              parentSupport: Boolean
 *              onlineComfortable: Boolean
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   ok: true
 *                   message: success
 *               fail:
 *                  value:
 *                   ok: false
 *                   message: unsuccessful
 */
app.post('/newstudentdetails', userMethods.newStudentDetails);

/**
 * @swagger
 * /newclientdetails:
 *   post:
 *     summary: Create new client details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *              name: String
 *              representativeName: String
 *              companyName: String
 *              phoneNumber: String
 *              email: String
 *              address: String
 *              requirement: String
 *              deadline: String
 *              source: String
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   ok: true
 *                   message: success
 *               fail:
 *                  value:
 *                   ok: false
 *                   message: unsuccessful
 */
app.post('/newclientdetails', clientMethods.newClientDetails);

/**
 * @swagger
 * /getunapprovedclients:
 *   get:
 *     summary: Get unapproved clients
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             examples:
 *               success:
 *                 value:
 *                   ok: true
 *                   message: successful
 *                   data:
 *                     - id: String
 *                       name: String
 *                       representativeName: String
 *                       phoneNumber: String
 *                       email: String
 *                       address: String
 *                       requirement: String
 *                       deadline: String
 *                       source: String
 *               fail:
 *                 value:
 *                   ok: false
 *                   message: unsuccessful
 */
app.get('/getunapprovedclients', clientMethods.getUnapprovedClients);

/**
 * @swagger
 * /getunapprovedstudents:
 *   get:
 *     summary: Get unapproved students
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             examples:
 *               success:
 *                 value:
 *                   ok: true
 *                   message: successful
 *                   data:
 *                     - id: String
 *                       name: String
 *                       guardianName: String
 *                       phoneNumber: String
 *                       email: String
 *                       address: String
 *                       interest: String
 *                       goals: String
 *                       source: String
 *                       courseInterested: boolean
 *                       parentSupport: boolean
 *                       onlineComfortable: boolean
 *               fail:
 *                 value:
 *                   ok: false
 *                   message: unsuccessful
 */
app.get('/getunapprovedstudents', userMethods.getUnapprovedStudents);

/**
 * @swagger
 * /getcounts:
 *   get:
 *     summary: Get count of all objects
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             examples:
 *               success:
 *                 value:
 *                   ok: true
 *                   message: successful
 *                   data:
 *                      - unapprovedStudentCount: 3
 *                        unapprovedClientCount: 2
 *                        studentCount: 6
 *                        clientCount: 5
 *                        pendingJobCount: 7
 *                        pendingInternCount: 8
 *                        totalPendingPosts: 15
 *                        totalEmployees: 15
 *                        totalOngoingProjects: 10
 *                        pendingProjects: 3
 *                        premiumProjects: 8
 *                        completed: 100
 *               fail:
 *                 value:
 *                   ok: false
 *                   message: unsuccessful
 */
app.get('/getcounts', userMethods.getStudentCounts, clientMethods.getClientCounts);

/**
 * @swagger
 * /getstudentdata:
 *   get:
 *     summary: Get all students
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             examples:
 *               success:
 *                 value:
 *                   ok: true
 *                   message: successful
 *                   data:
 *                     - id: String
 *                       name: String
 *                       guardianName: String
 *                       phoneNumber: String
 *                       email: String
 *                       address: String
 *                       interest: String
 *                       goals: String
 *                       source: String
 *                       courseInterested: boolean
 *                       parentSupport: boolean
 *                       onlineComfortable: boolean
 *               fail:
 *                 value:
 *                   ok: false
 *                   message: unsuccessful
 */
app.get('/getstudentdata', userMethods.getStudentData);

/**
 * @swagger
 * /getclientdata:
 *   get:
 *     summary: Get all clients
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             examples:
 *               success:
 *                 value:
 *                   ok: true
 *                   message: successful
 *                   data:
 *                     - id: String
 *                       name: String
 *                       representativeName: String
 *                       phoneNumber: String
 *                       email: String
 *                       address: String
 *                       requirement: String
 *                       deadline: String
 *                       source: String
 *               fail:
 *                 value:
 *                   ok: false
 *                   message: unsuccessful
 */
app.get('/getclientdata', clientMethods.getClientData);

/**
 * @swagger
 * /approvestudent:
 *   post:
 *     summary: Approve student
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *           example:
 *             id: String
 *             link: String
 *             proposal: binary
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             examples:
 *               success:
 *                 value:
 *                  ok: true
 *                  message: success
 *               fail:
 *                 value:
 *                   ok: false
 *                   message: unsuccessful
 */
app.post('/approvestudent', uploads.single('proposal'), userMethods.approveStudent);

/**
 * @swagger
 * /approveclient:
 *   post:
 *     summary: Approve a client
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *           example:
 *             id: String
 *             link: String
 *             proposal: binary
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             examples:
 *               success:
 *                 value:
 *                  ok: true
 *                  message: success
 *               fail:
 *                 value:
 *                   ok: false
 *                   message: unsuccessful
 */
app.post('/approveclient', uploads.single('proposal'), clientMethods.approveClient);


app.listen(5000, ()=>console.log('Server started'));