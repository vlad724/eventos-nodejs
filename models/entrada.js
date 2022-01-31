const { DataTypes } = require("sequelize");

const db = require('../database/connection');

const Entrada = db.define('Entrada', {
    comprador_nombre: {
        type: DataTypes.STRING
    },
    mail_comprador: {
        type: DataTypes.STRING
    },
    codigo_confirmacion: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Eventos_id: {
        type: DataTypes.STRING
    },
    Eventos_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

})

module.exports = Entrada;