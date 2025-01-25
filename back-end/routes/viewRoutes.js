const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/home/login', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/login/home-login.html');
    res.sendFile(filePath);
});

router.get('/login', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/login/login.html');
    res.sendFile(filePath);
});

router.get('/rotas', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/home/home-cards.html');
    res.sendFile(filePath);
});

router.get('/localizacao/onibus', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/home/home.html');
    res.sendFile(filePath);
});

router.get('/localizacao/motorista', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/driver/home-driver.html');
    res.sendFile(filePath);
});


module.exports = router;
