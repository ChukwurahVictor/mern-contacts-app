const Sequelize = require('sequelize');

module.exports = new Sequelize(
   'contactdb', 
   'postgres', 
   null, {
      host: process.env.POSTGRES_HOST,
      dialect: 'postgres',
      
      pool: {
         max: 5,
         min: 0,
         acquire: 30000,
         idle: 10000
      }
   }
);