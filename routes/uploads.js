const { Router } = require('express');
const { check } = require('express-validator');
const { actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controller/uploads');

const { validarArchivoSubir } = require('../middlewares/validar-archivo')

const router = Router();

router.put('/:id', [validarArchivoSubir], actualizarImagenCloudinary);
router.get('/:id', mostrarImagen);


module.exports = router;