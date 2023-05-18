const { DataTypes } = require('sequelize');
const db = require('../init.js');

const ClientModel = db.define('Client', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  interest: {
    type: DataTypes.STRING,
    allowNull: false
  },
  goals: {
    type: DataTypes.STRING,
    allowNull: false
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false
  },
  approvalStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'clients',
  timestamps: false
});


module.exports = ClientModel;