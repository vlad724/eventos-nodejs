const { DataTypes } = require("sequelize");
const db = require('../database/connection');

const Cliente = db.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },

})

module.exports = Cliente;