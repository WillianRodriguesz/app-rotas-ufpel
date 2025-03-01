const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/usuarios', authMiddleware, usuarioController.criarUsuario);
router.get('/usuarios', authMiddleware, usuarioController.listarUsuarios);
router.get('/usuarios/:email', usuarioController.obterUsuarioPorEmail);
router.put('/usuarios/:id_usuario', authMiddleware, usuarioController.atualizarUsuario);
router.delete('/usuarios/:id_usuario', authMiddleware, usuarioController.excluirUsuario);
router.post('/usuarios/redefinir-senha', authMiddleware, usuarioController.redefinirSenha);

module.exports = router;
