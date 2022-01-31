const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');

const Evento = require('../models/evento');


const actualizarImagen = async(req, res = response) => {

    const { id } = req.params;

    const evento = await Evento.findOne({
        where: {
            id: id
        }
    });

    if (!evento) {
        return res.status(400).json({
            msg: `No existe un evento con el id: ${id}`
        });
    }


    //limpiar imagenes previas

    if (evento.img) {
        //hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', 'evento', evento.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);

        }
    }

    const nombre = await subirArchivo(req.files, undefined, 'evento');
    evento.img = nombre;

    await evento.save();


    res.json(evento)

}
const mostrarImagen = async(req, res = response) => {
    const { id } = req.params;

    const evento = await Evento.findOne({
        where: {
            id: id
        }
    });

    if (!evento) {
        return res.status(400).json({
            msg: `No existe un evento con el id: ${id}`
        });
    }
    //limpiar imagenes previas

    if (evento.img) {
        //hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', 'evento', evento.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);

        }
    }



    //no tiene imagen se utilizara una imagen por defecto que se encuentra en assets
    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImagen);
}

const actualizarImagenCloudinary = async(req, res = response) => {

    const { id } = req.params;



    const evento = await Evento.findOne({
        where: {
            id: id
        }
    });

    if (!evento) {
        return res.status(400).json({
            msg: `No existe un evento con el id: ${id}`
        });
    }
    //limpiar imagenes previas

    if (evento.img) {
        const nombreArr = evento.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');


        cloudinary.uploader.destroy(public_id);

    }
    //path del archivo a subir
    const { tempFilePath } = req.files.archivo;

    // subir imagen a cloudinary
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);


    evento.img = secure_url;

    await evento.save();


    res.json(evento);


}

module.exports = {
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}