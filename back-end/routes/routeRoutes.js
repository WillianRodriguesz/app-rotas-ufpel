const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController.js');

router.post('/rotas', routeController.criarRota);
router.get('/rotas', routeController.listarRotas);
router.get('/rotas/:id', routeController.obterRotaPorId);
router.put('/rotas/:id', routeController.atualizarRota);
router.delete('/rotas/:id', routeController.excluirRota);

module.exports = router;
