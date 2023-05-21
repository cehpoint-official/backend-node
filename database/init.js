// const mongoose = require('mongoose');
const { Sequelize, DataTypes, BaseError } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    logging: (log) => {
        if (log instanceof BaseError) {
          console.error('Sequelize Error:', log);
        }
    }
});

db.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err) || process.exit(1);
});

db.sync()
.then(() => {
    console.log('Database and tables synced');
})
.catch(error => {
    console.error('Error syncing database:', error);
});


module.exports = db;