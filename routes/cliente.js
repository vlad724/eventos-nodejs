const { Router } = require('express');
const { getCliente, getClientes, postCliente, putCliente, deleteCliente, desbloquearCliente } = require('../controller/cliente');

const router = Router();

router.get('/', getClientes);
router.get('/:id', getCliente);
router.post('/', postCliente);
router.put('/:id', putCliente);
router.delete('/:id', deleteCliente);
router.put('/desbloquearusuario/:id', desbloquearCliente);

module.exports = router;