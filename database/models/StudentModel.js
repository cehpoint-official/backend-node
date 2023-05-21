const { DataTypes } = require('sequelize');
const db = require('../init.js');

const StudentModel = db.define('Student', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  guardianName: {
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
  courseInterested: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  parentSupport: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  onlineComfortable: {
    type: DataTypes.BOOLEAN,
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
  tableName: 'students',
  timestamps: false
});


module.exports = StudentModel;