const Usuario = require('../../models/userModel.js'); 
const emailService = require('./passwordResetService.js');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function inserirUsuario(nome, email, motorista) {
    try {
        const usuarioExistente = await Usuario.findOne({ where: { email } });

        if (usuarioExistente) {
            throw new Error('E-mail já cadastrado no sistema.');
        }
        senha = gerarSenhaAleatoria();

        console.log('senha gerada:', senha);

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        console.log('senha rashada', senhaCriptografada);

        const usuario = await Usuario.create({
            nome,
            email,
            senha: senhaCriptografada,
            motorista
        });
        await emailService.solicitarRedefinicaoSenha(email);
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

function gerarSenhaAleatoria(tamanho = 12) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const buffer = crypto.randomBytes(tamanho); 
    let senhaAleatoria = '';
    buffer.forEach(byte => {
        senhaAleatoria += caracteres[byte % caracteres.length]; 
    });

    return senhaAleatoria;
}

module.exports = { inserirUsuario, obterUsuarios, obterUsuarioPorEmail, atualizarUsuario, excluirUsuario };
