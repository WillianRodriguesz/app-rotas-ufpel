const routeService = require('../services/routes/routesService');

async function criarRota(req, res) {
    try {
        const { nome } = req.body;
        const rota = await routeService.inserirRota(nome);
        return res.status(201).json(rota);
    } catch (erro) {
        console.error('Erro ao criar rota:', erro);
        return res.status(500).json({ mensagem: 'Erro ao criar rota', erro });
    }
}

async function listarRotas(req, res) {
    try {
        const rotas = await routeService.obterRotas();
        return res.status(200).json(rotas);
    } catch (erro) {
        console.error('Erro ao listar rotas:', erro);
        return res.status(500).json({ mensagem: 'Erro ao listar rotas', erro });
    }
}

async function obterRotaPorId(req, res) {
    try {
        const { id } = req.params;
        const rota = await routeService.obterRotaPorId(id);

        if (!rota) {
            return res.status(404).json({ mensagem: 'Rota não encontrada' });
        }

        return res.status(200).json(rota);
    } catch (erro) {
        console.error('Erro ao buscar rota:', erro);
        return res.status(500).json({ mensagem: 'Erro ao buscar rota', erro });
    }
}

async function atualizarRota(req, res) {
    try {
        const { id } = req.params;
        const { nome } = req.body;

        const rotaAtualizada = await routeService.atualizarRota(id, nome);

        if (!rotaAtualizada) {
            return res.status(404).json({ mensagem: 'Rota não encontrada' });
        }

        return res.status(200).json(rotaAtualizada);
    } catch (erro) {
        console.error('Erro ao atualizar rota:', erro);
        return res.status(500).json({ mensagem: 'Erro ao atualizar rota', erro });
    }
}

async function excluirRota(req, res) {
    try {
        const { id } = req.params;
        const rotaExcluida = await routeService.excluirRota(id);

        if (!rotaExcluida) {
            return res.status(404).json({ mensagem: 'Rota não encontrada' });
        }

        return res.status(200).json({ mensagem: 'Rota excluída com sucesso', rota: rotaExcluida });
    } catch (erro) {
        console.error('Erro ao excluir rota:', erro);
        return res.status(500).json({ mensagem: 'Erro ao excluir rota', erro });
    }
}

async function listarRotasPorHorario(req, res) {
    try {
        const { id } = req.params; 
        const rotasPorHorario = await routeService.obterDetalhesRotaComParadasEHorario(id); 

        return res.status(200).json(rotasPorHorario); 
    } catch (erro) {
        console.error('Erro ao listar rotas por horário:', erro);
        return res.status(500).json({ mensagem: 'Erro ao listar rotas por horário', erro });
    }
}

module.exports = { 
    criarRota, 
    listarRotas, 
    obterRotaPorId, 
    atualizarRota, 
    excluirRota, 
    listarRotasPorHorario 
};
