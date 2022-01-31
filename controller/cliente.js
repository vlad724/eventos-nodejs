const { request, response } = require('express');
const Cliente = require('../models/cliente');
const bcryptjs = require('bcryptjs');

const getClientes = async(req = request, res = response) => {
    const clientes = await Cliente.findAll({ estado: true });

    if (clientes.length == 0) {
        return res.json({ msg: 'No hay nada que mostrar :c' });
    }

    res.json({ clientes });
}

const getCliente = async(req = request, res = response) => {

    const { id } = req.params;



    const cliente = await Cliente.findByPk(id);

    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({
            msg: `No existe cliente con id: ${id}`
        });
    }


}

const postCliente = async(req = request, res = response) => {

    const { nombre, password, id } = req.body;

    try {
        if (password.length == 0 || nombre.length == 0 || id.length == 0) {
            return res.status(500).json({
                msg: 'Esta enviando datos vacios'
            })
        } else {


            const existeId = await Cliente.findOne({
                where: {
                    id: id
                }
            });

            if (existeId) {
                return res.status(400).json({
                    msg: 'Ya existe un cliente con el id ' + id
                });
            }

            const existeNombre = await Cliente.findOne({
                where: {
                    nombre: nombre
                }
            });

            if (existeNombre) {
                return res.status(400).json({
                    msg: 'Ya existe un cliente con el nombre ' + nombre
                });
            }



            const cliente = new Cliente({ nombre, password, id });

            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            cliente.password = bcryptjs.hashSync(password, salt);

            await cliente.save();

            res.json(cliente);
        }

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}
const putCliente = async(req = request, res = response) => {

    const { id } = req.params;
    var { nombre, password } = req.body;


    try {

        if (password) {
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            password = bcryptjs.hashSync(password, salt);
        }
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                msg: `No existe cliente con id: ${id}`
            })
        }

        await cliente.update({ nombre, password });

        res.json(cliente);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}
const deleteCliente = async(req = request, res = response) => {

    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        return res.status(404).json({
            msg: `No existe cliente con id: ${id}`
        })
    }

    await cliente.update({ estado: false });

    //await usuario.destroy();

    res.json(cliente)

}

const desbloquearCliente = async(req = request, res = response) => {

    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        return res.status(404).json({
            msg: `No existe cliente con id: ${id}`
        })
    }

    //update con where
    await cliente.update({ estado: true }, { where: { id: id } });



    res.json(cliente)


}



module.exports = { getClientes, getCliente, postCliente, putCliente, deleteCliente, desbloquearCliente };