const express = require('express');
const path = require('path');
const router = express.Router();
const loginController = require('../controllers/loginController.js');

router.get('/home-login', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/login/home-login.html');
    res.sendFile(filePath);
});

// Rota para autenticar usuário
router.post('/login', loginController.autenticarUsuario);

// Rota para fazer logout (opcional)
router.post('/logout', loginController.fazerLogout);

module.exports = router;
