const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Cliente = require('../models/cliente');

const { generarJWT } = require('../helpers/generar-jwt');


const login = async(req, res = response) => {

    var { nombre, password } = req.body;

    try {
        // Verificar si el nombre existe
        const cliente = await Cliente.findOne({
            where: {
                nombre: nombre
            }
        });
        if (!cliente) {
            return res.status(400).json({
                msg: 'Nombre / Password no son correctos - nombre'
            });
        }
        // SI el cliente está activo
        if (!cliente.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, cliente.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Cliente / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT(cliente.id);

        res.json({
            cliente,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = { login }