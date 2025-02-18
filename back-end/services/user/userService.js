const Usuario = require('../../models/userModel.js'); 
const bcrypt = require('bcrypt');

async function inserirUsuario(nome, email, senha, motorista) {
    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await Usuario.create({
            nome,
            email,
            senha: senhaCriptografada,
            motorista
        });

        return usuario; 
    } catch (erro) {
        console.error('Erro ao inserir usuário:', erro);
        throw erro;
    }
}

async function obterUsuarios() {
    try {
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['senha'] },
            order: [
                ['motorista', 'DESC'], 
                ['nome', 'ASC'] 
            ]
        });
        return usuarios; 
    } catch (erro) {
        console.error('Erro ao listar usuários:', erro);
        throw erro;
    }
}

async function obterUsuarioPorEmail(email) {
    try {
        const usuario = await Usuario.findOne({
            where: { email }
        });

        return usuario; 
    } catch (erro) {
        console.error('Erro ao buscar usuário:', erro);
        throw erro;
    }
}

async function atualizarUsuario(id_usuario, nome, email, senha, motorista) {
    try {
        const usuario = await Usuario.findByPk(id_usuario);

        if (!usuario) {
            console.log('Usuário não encontrado');
            return null;
        }

        if (nome) usuario.nome = nome;
        if (email) usuario.email = email;
        if (senha) usuario.senha = await bcrypt.hash(senha, 10);
        if (motorista !== undefined) usuario.motorista = motorista;

        await usuario.save();

        return usuario;
    } catch (erro) {
        console.error('Erro ao atualizar usuário:', erro);
        throw erro;
    }
}

async function excluirUsuario(id_usuario) {
    try {
        const usuario = await Usuario.findByPk(id_usuario);

        if (!usuario) {
            console.log('Usuário não encontrado');
            return null;
        }

        await usuario.destroy();

        return usuario; 
    } catch (erro) {
        console.error('Erro ao excluir usuário:', erro);
        throw erro;
    }
}

module.exports = { inserirUsuario, obterUsuarios, obterUsuarioPorEmail, atualizarUsuario, excluirUsuario };
