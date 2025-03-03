const express = require('express');
const router = express.Router();
const paradaController = require('../controllers/stopController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/paradas', authMiddleware, paradaController.criarParada);
router.get('/paradas', paradaController.listarParadas);
router.get('/paradas/:id', paradaController.obterParadaPorId);
router.put('/paradas/:id', authMiddleware, paradaController.atualizarParada);
router.delete('/paradas/:id', authMiddleware, paradaController.excluirParada);

module.exports = router;
