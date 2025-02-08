const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/scheduleController.js');

router.post('/horarios', horarioController.criarHorario);
router.get('/horarios', horarioController.listarHorarios);
router.get('/horarios/:id', horarioController.obterHorarioPorId);
router.put('/horarios/:id', horarioController.atualizarHorario);
router.delete('/horarios/:id', horarioController.excluirHorario);

module.exports = router;
