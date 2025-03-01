const express = require('express');
const router = express.Router();
const notificacaoController = require('../controllers/notificacaoController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/notificacoes', authMiddleware, notificacaoController.criarNotificacao);
router.get('/notificacoes', notificacaoController.listarNotificacoes);
router.get('/notificacoes/ativas', notificacaoController.listarNotificacoesAtivas);
router.get('/notificacoes/:id', authMiddleware, notificacaoController.obterNotificacaoPorId);
router.put('/notificacoes/:id', authMiddleware, notificacaoController.atualizarNotificacao);
router.delete('/notificacoes/:id', authMiddleware, notificacaoController.excluirNotificacao);

module.exports = router;
