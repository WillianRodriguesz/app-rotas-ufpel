const express = require('express');
const router = express.Router();
const paradaController = require('../controllers/stopController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/paradas', paradaController.criarParada);
router.get('/paradas', paradaController.listarParadas);
router.get('/paradas/:id', paradaController.obterParadaPorId);
router.put('/paradas/:id', paradaController.atualizarParada);
router.delete('/paradas/:id', paradaController.excluirParada);

module.exports = router;
