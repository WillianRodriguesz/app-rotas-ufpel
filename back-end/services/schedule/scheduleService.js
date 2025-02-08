const Schedule = require('../../models/scheduleModel.js');

async function criarHorario(id_rota, horario) {
    try {
        const novoHorario = await Schedule.create({
            route_id: id_rota,
            time: horario
        });

        return novoHorario;
    } catch (erro) {
        console.error('Erro ao criar horário:', erro);
        throw erro;
    }
}

async function listarHorarios() {
    try {
        const horarios = await Schedule.findAll();
        return horarios;
    } catch (erro) {
        console.error('Erro ao listar horários:', erro);
        throw erro;
    }
}

async function obterHorarioPorId(id) {
    try {
        const horario = await Schedule.findByPk(id);
        return horario;
    } catch (erro) {
        console.error('Erro ao obter horário:', erro);
        throw erro;
    }
}

async function atualizarHorario(id, id_rota, novoHorario) {
    try {
        const horario = await Schedule.findByPk(id);

        if (!horario) {
            console.log('Horário não encontrado');
            return null;
        }

        horario.route_id = id_rota;
        horario.time = novoHorario;

        await horario.save();

        return horario;
    } catch (erro) {
        console.error('Erro ao atualizar horário:', erro);
        throw erro;
    }
}

async function excluirHorario(id) {
    try {
        const horario = await Schedule.findByPk(id);

        if (!horario) {
            console.log('Horário não encontrado');
            return null;
        }

        await horario.destroy();

        return horario;
    } catch (erro) {
        console.error('Erro ao excluir horário:', erro);
        throw erro;
    }
}

module.exports = {
    criarHorario,
    listarHorarios,
    obterHorarioPorId,
    atualizarHorario,
    excluirHorario
};
