const { DataTypes } = require('sequelize');
const db = require('../init.js');

const ClientModel = db.define('Client', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  representative_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
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
  requirement: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deadline: {
    type: DataTypes.STRING,
    allowNull: false
  },
  budget: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false
  },
  approvalStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  paymentLink: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  proposalName: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'clients',
  timestamps: false
});


module.exports = ClientModel;