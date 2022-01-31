const { request, response } = require('express');

const jwt = require('jsonwebtoken');
const { generarNombre } = require('../helpers/evento-metodo');


const { QueryTypes } = require('sequelize');
var db = require('../database/connection');

const Cliente = require('../models/cliente');
const Evento = require('../models/evento');
const Entrada = require('../models/entrada');

const postEvento = async(req = request, res = response) => {
    const { fecha_inicio, fecha_termino, _id, nombre_evento, descripcion, img, cantidad_entradas, precio_entrada } = req.body;

    const token = req.header('x-token');

    if (!token) {

        return res.status(401).json({ msg: 'No hay token en la peticion' });
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const cliente = await Cliente.findOne({
            where: {
                id: id
            }
        });

        if (!cliente) {

            return res.status(401).json({ msg: 'El id del cliente no existe' });
        }
        const fecha = new Date();
        const nombre_e = fecha.getFullYear() + '-' + fecha.getMonth() + 1 + '-' + fecha.getDate() + '-' + nombre_evento;
        const evento = await Evento.findOne({
            where: {
                nombre_evento: nombre_e
            }
        });



        const eventoid = await Evento.findOne({
            where: {
                id: _id
            }
        });


        if (eventoid) {
            return res.status(401).json({ msg: 'El id ya tiene evento asociado' });
        }



        if (evento) {

            let nombreGenerado = generarNombre(nombre_e);

            const eventoNombre = await Evento.findOne({
                where: {
                    nombre_evento: nombreGenerado
                }
            });
            if (eventoNombre) {
                return res.status(401).json({ msg: 'El nombre ya existe haga otro por favor' });
            }

            const data = {
                fecha_inicio,
                fecha_termino,
                id: _id,
                nombre_evento: nombreGenerado,
                descripcion,
                img,
                cantidad_entradas,
                Cliente_id: id,
                precio_entrada: precio_entrada
            }



            const eventoInsert = new Evento(data);
            await eventoInsert.save();

            return res.status(201).json(eventoInsert);
        }



        const data = {
            fecha_inicio,
            fecha_termino,
            id: _id,
            nombre_evento: nombre_e,
            descripcion,
            img,
            cantidad_entradas,
            Cliente_id: id,
            precio_entrada: precio_entrada
        }
        const eventoInsert = new Evento(data);
        await eventoInsert.save();
        return res.status(201).json(eventoInsert);


    } catch (error) {
        return res.status(404).json({ msg: 'error no encontrado' })
    }




}

const getEvento = async(req = request, res = response) => {
    const { events_id } = req.params;



    const eventosFilter = await db.query("SELECT nombre_evento, descripcion, fecha_inicio, cantidad_entradas, img FROM `eventos` WHERE estado_publicacion='published' and id=" + events_id + " ", { type: QueryTypes.SELECT });

    if (eventosFilter.length === 0) {
        return res.status(404).json({
            msg: 'No hay eventos publicados disponibles'
        });
    }

    return res.json(eventosFilter);

}

const getEventos = async(req = request, res = response) => {

    const eventosFilter = await db.query("select id, nombre_evento, fecha_inicio, cantidad_entradas from eventos where DATE_SUB(fecha_inicio,INTERVAL 7 DAY) AND estado_publicacion='published'", { type: QueryTypes.SELECT });

    if (eventosFilter.length === 0) {
        return res.status(404).json({
            msg: 'No hay eventos publicados disponibles'
        });
    }

    return res.json(eventosFilter);
}

const getEventosIdcliente = async(req = request, res = response) => {

    const { client_id } = req.params;
    const eventosFilter = await db.query("SELECT id, nombre_evento, fecha_inicio, cantidad_entradas, precio_entrada  FROM `eventos` WHERE Cliente_id=" + client_id + " ", { type: QueryTypes.SELECT });

    if (eventosFilter.length === 0) {
        return res.status(404).json({
            msg: `El cliente con id: ${client_id} no tiene eventos asociados`
        });
    }

    return res.json(eventosFilter);



}


const putEventoCreatedToPublished = async(req = request, res = response) => {

    const { client_id, event_id } = req.params;


    const eventosFilter = await db.query("SELECT * FROM `eventos` WHERE Cliente_id=" + client_id + " and id=" + event_id + "", { type: QueryTypes.SELECT });

    if (eventosFilter.length === 0) {
        return res.status(404).json({
            msg: 'No hay eventos asociados'
        });
    }


    const eventoUpdate = await db.query("UPDATE eventos SET estado_publicacion='published', fecha_inicio=now() where id=" + event_id + "", { type: QueryTypes.UPDATE })

    return res.json({
        msg: `El evento don id: ${event_id} fue marcado published con exito`
    });

}

const buyEvent = async(req = request, res = response) => {

    const { event_id } = req.params;
    const { comprador_nombre, mail_comprador } = req.body;

    const eventoModelo = await Evento.findOne({
        where: {
            id: event_id
        }
    });
    if (!eventoModelo) {
        return res.status(401).json({ msg: 'No hay evento asociado' });
    }
    try {
        let cantidadEntradas = eventoModelo.cantidad_entradas;

        if (cantidadEntradas === 0) {
            return res.status(401).json({ msg: `El evento: '${eventoModelo.nombre_evento}' no cuenta con mas entradas que vender` });
        }

        await eventoModelo.update({ cantidad_entradas: cantidadEntradas - 1 });

        const uuidInt = Math.random() * 9999999999;


        const dataEntrada = {
            comprador_nombre,
            mail_comprador,
            codigo_confirmacion: uuidInt,
            Eventos_id: event_id
        }
        const entradaInsert = new Entrada(dataEntrada);
        await entradaInsert.save();

        return res.status(201).json(entradaInsert);


    } catch (error) {
        return res.status(404).json({ msg: 'error no encontrado' })
    }


}

module.exports = { postEvento, getEvento, getEventos, getEventosIdcliente, putEventoCreatedToPublished, buyEvent };