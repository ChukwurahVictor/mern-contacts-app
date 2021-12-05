const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

const User = db.define('User', {
   id: {
      field: 'userId',
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
   },
   name: {
      type: Sequelize.STRING,
      allowNull: false
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false
   }
}, {
   timestamps: false,
   hooks: {
      beforeCreate: async function(user) {
         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(user.password, salt);
      }
   }
});

User.prototype.validPassword = async function(password) {
   return await bcrypt.compare(password, this.password);
}

User.prototype.getSignedToken = function() {
   return  jwt.sign({ id: this.userId }, "mysecretkey", {
      expiresIn: "24hr",
   });
}

module.exports = User;