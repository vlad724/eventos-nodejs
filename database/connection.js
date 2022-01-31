 const { Sequelize } = require('sequelize');

 const db = new Sequelize('desafio_db', 'root', '', {
     host: 'localhost',
     dialect: 'mysql',
     //logging: false
 });

 module.exports = db;