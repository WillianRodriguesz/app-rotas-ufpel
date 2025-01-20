const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController.js');

// Rota para autenticar usuário
router.post('/login', loginController.autenticarUsuario);

// Rota para fazer logout (opcional)
router.post('/logout', loginController.fazerLogout);

module.exports = router;
