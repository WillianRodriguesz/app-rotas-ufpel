const express = require('express');
const path = require('path');
const router = express.Router();
const loginController = require('../controllers/loginController.js');

router.post('/login', loginController.autenticarUsuario);

router.post('/logout', loginController.fazerLogout);

module.exports = router;
