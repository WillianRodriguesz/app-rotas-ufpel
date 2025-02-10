const Rota = require('../../models/routeModel');

async function inserirRota(nome) {
    try {
        const rota = await Rota.create({ nome });
        return rota;
    } catch (erro) {
        console.error('Erro ao inserir rota:', erro);
        throw erro;
    }
}

async function obterRotas() {
    try {
        const rotas = await Rota.findAll();
        return rotas;
    } catch (erro) {
        console.error('Erro ao listar rotas:', erro);
        throw erro;
    }
}

async function obterRotaPorId(id) {
    try {
        const rota = await Rota.findByPk(id);
        if (!rota) {
            console.log('Rota não encontrada');
            return null;
        }
        return rota;
    } catch (erro) {
        console.error('Erro ao buscar rota:', erro);
        throw erro;
    }
}

async function atualizarRota(id, nome) {
    try {
        const rota = await Rota.findByPk(id);
        if (!rota) {
            console.log('Rota não encontrada');
            return null;
        }

        rota.nome = nome;
        await rota.save();
        return rota;
    } catch (erro) {
        console.error('Erro ao atualizar rota:', erro);
        throw erro;
    }
}

async function excluirRota(id) {
    try {
        const rota = await Rota.findByPk(id);
        if (!rota) {
            console.log('Rota não encontrada');
            return null;
        }

        await rota.destroy();
        return rota;
    } catch (erro) {
        console.error('Erro ao excluir rota:', erro);
        throw erro;
    }
}

module.exports = { inserirRota, obterRotas, obterRotaPorId, atualizarRota, excluirRota };
