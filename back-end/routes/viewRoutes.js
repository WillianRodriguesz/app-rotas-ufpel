const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/login/home-login.html');
    res.sendFile(filePath);
});

router.get('/login', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/login/login.html');
    res.sendFile(filePath);
});

router.get('/rotas', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/home/rotas.html');
    res.sendFile(filePath);
});

router.get('/rotas/detalhes', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/home/rotas-horarios.html');
    res.sendFile(filePath);
});

router.get('/inicio', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/home/inicio.html');
    res.sendFile(filePath);
});

router.get('/localizacao/onibus', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/home/localizacao.html');
    res.sendFile(filePath);
});

router.get('/localizacao/motorista', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/driver/home-driver.html');
    res.sendFile(filePath);
});

router.get('/painel', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/admin/home.html');
    res.sendFile(filePath);
});

router.get('/painel/usuarios', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/admin/users/users.html');
    res.sendFile(filePath);
});

router.get('/redefinir-senha/:token', (req, res) => {
    const filePath = path.resolve(__dirname, '../../front-end/public/pages/reset-password/reset-password.html');
    res.sendFile(filePath);
});

module.exports = router;
