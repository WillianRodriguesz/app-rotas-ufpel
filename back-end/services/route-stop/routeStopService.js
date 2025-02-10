const sequelize = require('../../config/config');
const RouteStop = require('../../models/routeStopModel.js');
const Route = require('../../models/routeModel.js');
const Stop = require('../../models/stopModel.js');

async function inserirRotaParada(route_id, stop_id, order) {
    try {
        const rotaParada = await RouteStop.create({
            route_id,
            stop_id,
            order
        });

        return rotaParada;
    } catch (erro) {
        console.error('Erro ao inserir parada na rota:', erro);
        throw erro;
    }
}

async function listarRotasParadas() {
    try {
        const rotasParadas = await RouteStop.findAll({
            include: [
                { model: Route, attributes: ['name'] },
                { model: Stop, attributes: ['nome'] }
            ]
        });

        return rotasParadas;
    } catch (erro) {
        console.error('Erro ao listar paradas das rotas:', erro);
        throw erro;
    }
}

async function obterRotaParadaPorId(id) {
    try {
        const rotaParada = await RouteStop.findByPk(id, {
            include: [
                { model: Route, attributes: ['name'] },
                { model: Stop, attributes: ['nome'] }
            ]
        });

        return rotaParada;
    } catch (erro) {
        console.error('Erro ao buscar parada de rota:', erro);
        throw erro;
    }
}

async function atualizarRotaParada(id, route_id, stop_id, order) {
    try {
        const rotaParada = await RouteStop.findByPk(id);

        if (!rotaParada) {
            console.log('Rota parada não encontrada');
            return null;
        }

        rotaParada.route_id = route_id;
        rotaParada.stop_id = stop_id;
        rotaParada.order = order;

        await rotaParada.save();

        return rotaParada;
    } catch (erro) {
        console.error('Erro ao atualizar parada da rota:', erro);
        throw erro;
    }
}

async function excluirRotaParada(id) {
    try {
        const rotaParada = await RouteStop.findByPk(id);

        if (!rotaParada) {
            console.log('Rota parada não encontrada');
            return null;
        }

        await rotaParada.destroy();

        return rotaParada;
    } catch (erro) {
        console.error('Erro ao excluir parada da rota:', erro);
        throw erro;
    }
}

async function obterParadasPorRota(rotaId) {
    try {
        const query = `
            SELECT DISTINCT 
                p.id AS parada_id,
                p.nome AS parada_nome,
                p.latitude,
                p.longitude
            FROM rotas r
            LEFT JOIN rota_paradas rp ON r.id = rp.rota_id
            LEFT JOIN paradas p ON rp.parada_id = p.id
            WHERE r.id = :rotaId;
        `;

        const resultados = await sequelize.query(query, {
            replacements: { rotaId },
            type: sequelize.QueryTypes.SELECT
        });

        const jsonResponse = {
            rotaId: rotaId,
            paradas: resultados.map(parada => ({
                parada_id: parada.parada_id,
                parada_nome: parada.parada_nome,
                coordenadas: {
                    latitude: parada.latitude,
                    longitude: parada.longitude
                }
            }))
        };

        console.log('Resposta estruturada:', jsonResponse);

        return jsonResponse;
    } catch (erro) {
        console.error('Erro ao buscar paradas da rota:', erro);
        throw erro;
    }
}
module.exports = {
    obterParadasPorRota, 
    inserirRotaParada, 
    listarRotasParadas, 
    obterRotaParadaPorId, 
    atualizarRotaParada, 
    excluirRotaParada 
};
