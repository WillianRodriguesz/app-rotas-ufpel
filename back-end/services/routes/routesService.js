const Route = require('../../models/routeModel.js');
const RouteStop = require('../../models/routeStopModel.js');
const Stop = require('../../models/stopModel.js');
const Schedule = require('../../models/scheduleModel.js');

async function inserirRota(nome) {
    try {
        const rota = await Route.create({
            name: nome
        });
        return rota;
    } catch (erro) {
        console.error('Erro ao inserir rota:', erro);
        throw erro;
    }
}

async function obterRotas() {
    try {
        const rotas = await Route.findAll({
            include: [
                {
                    model: Stop,
                    through: { attributes: [] }
                },
                Schedule
            ]
        });
        return rotas;
    } catch (erro) {
        console.error('Erro ao listar rotas:', erro);
        throw erro;
    }
}

async function obterRotaPorId(id) {
    try {
        const rota = await Route.findOne({
            where: { id },
            include: [
                {
                    model: Stop,
                    through: { attributes: [] }
                },
                Schedule
            ]
        });
        return rota;
    } catch (erro) {
        console.error('Erro ao buscar rota:', erro);
        throw erro;
    }
}

async function atualizarRota(id, nome) {
    try {
        const rota = await Route.findByPk(id);
        if (!rota) {
            console.log('Rota não encontrada');
            return null;
        }

        rota.name = nome;
        await rota.save();
        return rota;
    } catch (erro) {
        console.error('Erro ao atualizar rota:', erro);
        throw erro;
    }
}

async function excluirRota(id) {
    try {
        const rota = await Route.findByPk(id);
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
