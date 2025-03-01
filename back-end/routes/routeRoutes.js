const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/adicionar/rotas', authMiddleware, routeController.criarRota);
router.get('/buscar/rotas', routeController.listarRotas);
router.get('/rotas/:id', routeController.obterRotaPorId);
router.put('/rotas/:id', authMiddleware, routeController.atualizarRota);
router.delete('/rotas/:id', authMiddleware, routeController.excluirRota);
router.get('/rotas/:id/horarios', routeController.listarRotasPorHorario); 


module.exports = router;
