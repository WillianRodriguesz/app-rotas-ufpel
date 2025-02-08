const ParadaServico = require('../services/stop/stopService'); // Importa o serviço de paradas

// Função para criar uma nova parada
async function criarParada(req, res) {
    try {
        const { nome, latitude, longitude } = req.body;

        if (!nome || !latitude || !longitude) {
            return res.status(400).json({ mensagem: 'Nome, latitude e longitude são obrigatórios.' });
        }

        const novaParada = await ParadaServico.criarParada(nome, latitude, longitude);

        return res.status(201).json(novaParada); 
    } catch (erro) {
        console.error('Erro ao criar parada:', erro);
        return res.status(500).json({ mensagem: 'Erro ao criar parada' });
    }
}

// Função para listar todas as paradas
async function listarParadas(req, res) {
    try {
        const paradas = await ParadaServico.listarParadas();
        return res.status(200).json(paradas); 
    } catch (erro) {
        console.error('Erro ao listar paradas:', erro);
        return res.status(500).json({ mensagem: 'Erro ao listar paradas' });
    }
}

// Função para obter uma parada pelo ID
async function obterParadaPorId(req, res) {
    try {
        const { id } = req.params;

        const parada = await ParadaServico.obterParadaPorId(id);

        if (!parada) {
            return res.status(404).json({ mensagem: 'Parada não encontrada' });
        }

        return res.status(200).json(parada); 
    } catch (erro) {
        console.error('Erro ao buscar parada:', erro);
        return res.status(500).json({ mensagem: 'Erro ao buscar parada' });
    }
}

// Função para atualizar uma parada
async function atualizarParada(req, res) {
    try {
        const { id } = req.params;
        const { nome, latitude, longitude } = req.body;

        const paradaAtualizada = await ParadaServico.atualizarParada(id, nome, latitude, longitude);

        if (!paradaAtualizada) {
            return res.status(404).json({ mensagem: 'Parada não encontrada' });
        }

        return res.status(200).json(paradaAtualizada); 
    } catch (erro) {
        console.error('Erro ao atualizar parada:', erro);
        return res.status(500).json({ mensagem: 'Erro ao atualizar parada' });
    }
}

// Função para excluir uma parada
async function excluirParada(req, res) {
    try {
        const { id } = req.params;

        const paradaExcluida = await ParadaServico.excluirParada(id);

        if (!paradaExcluida) {
            return res.status(404).json({ mensagem: 'Parada não encontrada' });
        }

        return res.status(200).json({ mensagem: 'Parada excluída com sucesso' }); 
    } catch (erro) {
        console.error('Erro ao excluir parada:', erro);
        return res.status(500).json({ mensagem: 'Erro ao excluir parada' });
    }
}

module.exports = { criarParada, listarParadas, obterParadaPorId, atualizarParada, excluirParada };
