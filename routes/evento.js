const { Router } = require('express');
const { postEvento, getEvento, getEventos, getEventosIdcliente, putEventoCreatedToPublished, buyEvent } = require('../controller/evento');
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.get('/', getEventos);
router.get('/:events_id', getEvento);
router.get('/:client_id/events', getEventosIdcliente);

router.put('/:client_id/events/:event_id/publish', putEventoCreatedToPublished);

router.post('/', [validarJWT], postEvento);
router.post('/:event_id/buy', buyEvent);

module.exports = router;