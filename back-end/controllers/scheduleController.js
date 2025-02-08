const scheduleService = require('../services/scheduleService');

async function criarHorario(req, res) {
    try {
        const { route_id, time } = req.body;

        if (!route_id || !time) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
        }

        const novoHorario = await scheduleService.criarHorario(route_id, time);
        return res.status(201).json(novoHorario);
    } catch (erro) {
        console.error('Erro ao criar horário:', erro);
        return res.status(500).json({ erro: 'Erro interno ao criar horário' });
    }
}

async function listarHorarios(req, res) {
    try {
        const horarios = await scheduleService.listarHorarios();
        return res.status(200).json(horarios);
    } catch (erro) {
        console.error('Erro ao listar horários:', erro);
        return res.status(500).json({ erro: 'Erro interno ao listar horários' });
    }
}

async function obterHorarioPorId(req, res) {
    try {
        const { id } = req.params;

        const horario = await scheduleService.obterHorarioPorId(id);

        if (!horario) {
            return res.status(404).json({ erro: 'Horário não encontrado' });
        }

        return res.status(200).json(horario);
    } catch (erro) {
        console.error('Erro ao obter horário:', erro);
        return res.status(500).json({ erro: 'Erro interno ao obter horário' });
    }
}

async function atualizarHorario(req, res) {
    try {
        const { id } = req.params;
        const { route_id, time } = req.body;

        if (!route_id || !time) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
        }

        const horarioAtualizado = await scheduleService.atualizarHorario(id, route_id, time);

        if (!horarioAtualizado) {
            return res.status(404).json({ erro: 'Horário não encontrado' });
        }

        return res.status(200).json(horarioAtualizado);
    } catch (erro) {
        console.error('Erro ao atualizar horário:', erro);
        return res.status(500).json({ erro: 'Erro interno ao atualizar horário' });
    }
}

async function excluirHorario(req, res) {
    try {
        const { id } = req.params;

        const horarioExcluido = await scheduleService.excluirHorario(id);

        if (!horarioExcluido) {
            return res.status(404).json({ erro: 'Horário não encontrado' });
        }

        return res.status(200).json({ mensagem: 'Horário excluído com sucesso' });
    } catch (erro) {
        console.error('Erro ao excluir horário:', erro);
        return res.status(500).json({ erro: 'Erro interno ao excluir horário' });
    }
}

module.exports = {
    criarHorario,
    listarHorarios,
    obterHorarioPorId,
    atualizarHorario,
    excluirHorario
};
