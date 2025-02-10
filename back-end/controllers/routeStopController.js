const routeStopService = require('../services/route-stop/routeStopService');

async function criarRotaParada(req, res) {
    try {
        const { route_id, stop_id, order } = req.body;
        const rotaParada = await routeStopService.inserirRotaParada(route_id, stop_id, order);
        res.status(201).json(rotaParada);
    } catch (erro) {
        console.error('Erro ao criar rota parada:', erro);
        res.status(500).json({ mensagem: 'Erro ao criar a rota parada' });
    }
}

async function listarRotasParadas(req, res) {
    try {
        const rotasParadas = await routeStopService.listarRotasParadas();
        res.status(200).json(rotasParadas);
    } catch (erro) {
        console.error('Erro ao listar rotas paradas:', erro);
        res.status(500).json({ mensagem: 'Erro ao listar rotas paradas' });
    }
}

async function obterRotaParadaPorId(req, res) {
    try {
        const { id } = req.params;
        const rotaParada = await routeStopService.obterRotaParadaPorId(id);

        if (!rotaParada) {
            return res.status(404).json({ mensagem: 'Rota parada não encontrada' });
        }

        res.status(200).json(rotaParada);
    } catch (erro) {
        console.error('Erro ao obter rota parada:', erro);
        res.status(500).json({ mensagem: 'Erro ao obter rota parada' });
    }
}

async function atualizarRotaParada(req, res) {
    try {
        const { id } = req.params;
        const { route_id, stop_id, order } = req.body;
        const rotaParadaAtualizada = await routeStopService.atualizarRotaParada(id, route_id, stop_id, order);

        if (!rotaParadaAtualizada) {
            return res.status(404).json({ mensagem: 'Rota parada não encontrada' });
        }

        res.status(200).json(rotaParadaAtualizada);
    } catch (erro) {
        console.error('Erro ao atualizar rota parada:', erro);
        res.status(500).json({ mensagem: 'Erro ao atualizar a rota parada' });
    }
}

async function excluirRotaParada(req, res) {
    try {
        const { id } = req.params;
        const rotaParadaExcluida = await routeStopService.excluirRotaParada(id);

        if (!rotaParadaExcluida) {
            return res.status(404).json({ mensagem: 'Rota parada não encontrada' });
        }

        res.status(200).json({ mensagem: 'Rota parada excluída com sucesso' });
    } catch (erro) {
        console.error('Erro ao excluir rota parada:', erro);
        res.status(500).json({ mensagem: 'Erro ao excluir a rota parada' });
    }
}

async function obterParadasPorRota(req, res) {
    try {
        const { rotaId } = req.params;  
        const paradas = await routeStopService.obterParadasPorRota(rotaId); 

        if (!paradas) {
            return res.status(404).json({ mensagem: 'Nenhuma parada encontrada para esta rota' });
        }

        res.status(200).json(paradas); 
    } catch (erro) {
        console.error('Erro ao buscar paradas da rota:', erro);
        res.status(500).json({ mensagem: 'Erro ao buscar paradas da rota' });
    }
}

module.exports = { 
    criarRotaParada, 
    listarRotasParadas, 
    obterRotaParadaPorId, 
    atualizarRotaParada, 
    excluirRotaParada, 
    obterParadasPorRota 
};
