const  Parada  = require('../../models/stopModel'); 

async function criarParada(nome, latitude, longitude) {
    try {
        const parada = await Parada.create({
            nome,
            latitude,
            longitude
        });

        return parada; 
    } catch (erro) {
        console.error('Erro ao criar parada:', erro);
        throw erro;
    }
}

async function listarParadas() {
    try {
        const paradas = await Parada.findAll();
        return paradas; 
    } catch (erro) {
        console.error('Erro ao listar paradas:', erro);
        throw erro;
    }
}

async function obterParadaPorId(id) {
    try {
        const parada = await Parada.findByPk(id);

        return parada; 
    } catch (erro) {
        console.error('Erro ao buscar parada:', erro);
        throw erro;
    }
}

async function atualizarParada(id, nome, latitude, longitude) {
    try {
        const parada = await Parada.findByPk(id);

        if (!parada) {
            console.log('Parada não encontrada');
            return null;
        }

        parada.nome = nome;
        parada.latitude = latitude;
        parada.longitude = longitude;

        await parada.save();

        return parada; 
    } catch (erro) {
        console.error('Erro ao atualizar parada:', erro);
        throw erro;
    }
}

async function excluirParada(id) {
    try {
        const parada = await Parada.findByPk(id);

        if (!parada) {
            console.log('Parada não encontrada');
            return null;
        }

        await parada.destroy();

        return parada; 
    } catch (erro) {
        console.error('Erro ao excluir parada:', erro);
        throw erro;
    }
}

module.exports = { criarParada, listarParadas, obterParadaPorId, atualizarParada, excluirParada };
