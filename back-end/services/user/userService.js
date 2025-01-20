const Motorista = require('../../models/userModel.js'); 
const bcrypt = require('bcrypt');

async function inserirMotorista(nome, email, senha, admin) {
    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const motorista = await Motorista.create({
            nome,
            email,
            senha: senhaCriptografada,
            admin
        });

        return motorista; 
    } catch (erro) {
        console.error('Erro ao inserir motorista:', erro);
        throw erro;
    }
}

async function obterMotoristas() {
    try {
        const motoristas = await Motorista.findAll();
        return motoristas; 
    } catch (erro) {
        console.error('Erro ao listar motoristas:', erro);
        throw erro;
    }
}

async function obterMotoristaPorEmail(email) {
    try {
        const motorista = await Motorista.findOne({
            where: { email }
        });

        return motorista; 
    } catch (erro) {
        console.error('Erro ao buscar motorista:', erro);
        throw erro;
    }
}

async function atualizarMotorista(id_motorista, nome, email, senha, admin) {
    try {
        const motorista = await Motorista.findByPk(id_motorista);

        if (!motorista) {
            console.log('Motorista não encontrado');
            return null;
        }

        motorista.nome = nome;
        motorista.email = email;
        motorista.senha = senha ? await bcrypt.hash(senha, 10) : motorista.senha;
        motorista.admin = admin;

        await motorista.save();

        return motorista; 
    } catch (erro) {
        console.error('Erro ao atualizar motorista:', erro);
        throw erro;
    }
}

async function excluirMotorista(id_motorista) {
    try {
        const motorista = await Motorista.findByPk(id_motorista);

        if (!motorista) {
            console.log('Motorista não encontrado');
            return null;
        }

        await motorista.destroy();

        return motorista; 
    } catch (erro) {
        console.error('Erro ao excluir motorista:', erro);
        throw erro;
    }
}

module.exports = { inserirMotorista, obterMotoristas, obterMotoristaPorEmail, atualizarMotorista, excluirMotorista };
