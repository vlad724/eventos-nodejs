const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Cliente = require('../models/cliente');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el cliente que corresponde al id
        const cliente = await Cliente.findOne({
            where: {
                id: id
            }
        });

        if (!cliente) {
            return res.status(401).json({
                msg: 'Token no válido - cliente no existe DB'
            })
        }
        // Verificar si el id tiene estado true
        if (!cliente.estado) {
            return res.status(401).json({
                msg: 'Token no válido - cliente con estado: false'
            })
        }

        req.cliente = cliente;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}