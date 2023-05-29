const { DataTypes } = require('sequelize');
const db = require('../init.js');

const ClientModel = db.define('Client', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  representativeName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'representative_name'
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'company_name'
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'phone_number'
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