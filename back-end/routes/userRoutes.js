const express = require('express');
const router = express.Router();
const motoristaController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');


// Rota para criar um novo motorista
router.post('/motoristas', authMiddleware,  motoristaController.criarMotorista);

// Rota para listar todos os motoristas
router.get('/motoristas', authMiddleware, motoristaController.listarMotoristas);

// Rota para obter um motorista por email
router.get('/motoristas/:email', motoristaController.obterMotoristaPorEmail);

// Rota para atualizar as informações de um motorista
router.put('/motoristas/:id_motorista', authMiddleware,  motoristaController.atualizarMotorista);

// Rota para excluir um motorista
router.delete('/motoristas/:id_motorista', authMiddleware,  motoristaController.excluirMotorista);

module.exports = router;
