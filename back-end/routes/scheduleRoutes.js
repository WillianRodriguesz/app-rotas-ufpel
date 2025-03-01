const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/scheduleController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');


router.post('/horarios', authMiddleware, horarioController.criarHorario);
router.get('/horarios', horarioController.listarHorarios);
router.get('/horarios/:id', horarioController.obterHorarioPorId);
router.put('/horarios/:id', authMiddleware, horarioController.atualizarHorario);
router.delete('/horarios/:id', authMiddleware, horarioController.excluirHorario);

module.exports = router;
