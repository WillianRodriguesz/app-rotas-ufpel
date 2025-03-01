const express = require('express');
const router = express.Router();
const routeStopController = require('../controllers/routeStopController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');


router.post('/rota-paradas', authMiddleware, routeStopController.criarRotaParada);
router.get('/rota-paradas', routeStopController.listarRotasParadas);
router.get('/rota-paradas/:id', routeStopController.obterRotaParadaPorId);
router.put('/rota-paradas/:id', authMiddleware, routeStopController.atualizarRotaParada);
router.delete('/rota-paradas/:id', authMiddleware, routeStopController.excluirRotaParada);
router.get('/rotas/:rotaId/paradas', routeStopController.obterParadasPorRota);

module.exports = router;
