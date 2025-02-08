const express = require('express');
const router = express.Router();
const routeStopController = require('../controllers/routeStopController.js');

router.post('/rota-paradas', routeStopController.criarRotaParada);
router.get('/rota-paradas', routeStopController.listarRotasParadas);
router.get('/rota-paradas/:id', routeStopController.obterRotaParadaPorId);
router.put('/rota-paradas/:id', routeStopController.atualizarRotaParada);
router.delete('/rota-paradas/:id', routeStopController.excluirRotaParada);

module.exports = router;
