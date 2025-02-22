const express = require('express');
const router = express.Router();
const notificacaoController = require('../controllers/notificacaoController.js');

router.post('/notificacoes', notificacaoController.criarNotificacao);
router.get('/notificacoes', notificacaoController.listarNotificacoes);
router.get('/notificacoes/ativas/:dataHoraUsuario', notificacaoController.listarNotificacoesAtivas);
router.get('/notificacoes/:id', notificacaoController.obterNotificacaoPorId);
router.put('/notificacoes/:id', notificacaoController.atualizarNotificacao);
router.delete('/notificacoes/:id', notificacaoController.excluirNotificacao);

module.exports = router;
