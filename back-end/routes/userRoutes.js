const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/usuarios', usuarioController.criarUsuario);
router.get('/usuarios', usuarioController.listarUsuarios);
router.get('/usuarios/:email', usuarioController.obterUsuarioPorEmail);
router.put('/usuarios/:id_usuario', usuarioController.atualizarUsuario);
router.delete('/usuarios/:id_usuario', usuarioController.excluirUsuario);

module.exports = router;
