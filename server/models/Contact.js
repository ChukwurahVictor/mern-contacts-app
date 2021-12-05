const Sequelize = require('sequelize');
const db = require('../config/db');

const Contact = db.define('Contact', {
   id: {
      field: 'contactId',
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
   },
   firstname: {
      type: Sequelize.STRING,
      allowNull: false
   },
   lastname: Sequelize.STRING,
   phone: {
      type: Sequelize.STRING,
      allowNull: false
   },
   email: Sequelize.STRING
}, {
   timestamps: false
});

module.exports = Contact;