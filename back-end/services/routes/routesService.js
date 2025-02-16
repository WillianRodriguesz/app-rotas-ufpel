const sequelize = require('../../config/config');
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

// Adicionando a consulta personalizada para buscar rotas, paradas e horários
async function obterDetalhesRotaComParadasEHorario(id) {
    try {
        const query = `
            SELECT 
                r.id AS rota_id,
                r.nome AS rota_nome,
                p.id AS parada_id,
                p.nome AS parada_nome,
                rp.ordem,
                h.horario
            FROM 
                rotas r
            JOIN 
                rota_paradas rp ON r.id = rp.rota_id
            JOIN 
                paradas p ON rp.parada_id = p.id
            LEFT JOIN 
                horarios h ON r.id = h.rota_id
            WHERE 
                r.id = :rotaId
            ORDER BY 
                h.horario, rp.ordem;
        `;

        const resultados = await sequelize.query(query, {
            replacements: { rotaId: id },
            type: sequelize.QueryTypes.SELECT
        });

        const jsonResponse = {
            rotaId: id,
            rotas: resultados.map(result => ({
                rota_id: result.rota_id,
                rota_nome: result.rota_nome,
                parada_id: result.parada_id,
                parada_nome: result.parada_nome,
                ordem: result.ordem,
                horario: result.horario
            }))
        };

        console.log('Detalhes da Rota:', jsonResponse);
        return jsonResponse;

    } catch (erro) {
        console.error('Erro ao obter detalhes da rota com paradas e horários:', erro);
        throw erro;
    }
}

module.exports = { 
    inserirRota, 
    obterRotas, 
    obterRotaPorId, 
    atualizarRota, 
    excluirRota,
    obterDetalhesRotaComParadasEHorario  
};
