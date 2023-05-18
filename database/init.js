const mongoose = require('mongoose');
require('dotenv').config();

const db_url = process.env.MONGO_URL + process.env.MONGO_PASSWORD + process.env.MONGO_CLUSTER;
const db = mongoose.connect(db_url)
.then(()=>console.log('database connection successful'))
.catch(err => console.log(err) || process.exit(1));

module.exports.db = db;