const { DataTypes } = require("sequelize");

const db = require('../database/connection');

const Evento = db.define('Evento', {
    fecha_inicio: {
        type: DataTypes.DATE
    },
    fecha_termino: {
        type: DataTypes.DATE
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre_evento: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.STRING
    },
    estado_publicacion: {
        type: DataTypes.STRING
    },
    cantidad_entradas: {
        type: DataTypes.INTEGER
    },
    precio_entrada: {
        type: DataTypes.INTEGER
    },
    Cliente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

})

module.exports = Evento;