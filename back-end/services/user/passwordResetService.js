const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { obterUsuarioPorEmail, atualizarUsuario } = require('./userService.js');
require('dotenv').config();

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// 1️⃣ Função para solicitar redefinição de senha
async function solicitarRedefinicaoSenha(email) {
    try {
        const usuario = await obterUsuarioPorEmail(email);
        if (!usuario) {
            console.log('Usuário não encontrado');
            return null;
        }

        // Criando token JWT com expiração de 1 hora
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Link de redefinição de senha
        const resetLink = `${process.env.FRONTEND_URL}/redefinir-senha/${token}`;

        // Envio do e-mail
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: usuario.email,
            subject: 'Redefinição de Senha',
            text: `Clique no link abaixo para redefinir sua senha:\n\n${resetLink}\n\nEsse link expira em 1 hora.`
        };

        await transporter.sendMail(mailOptions);
        console.log('E-mail de redefinição de senha enviado com sucesso');

        return { mensagem: 'E-mail enviado com sucesso' };
    } catch (erro) {
        console.error('Erro ao solicitar redefinição de senha:', erro);
        throw erro;
    }
}

// 2️⃣ Função para redefinir a senha
async function redefinirSenha(token, novaSenha) {
    try {
        // Verificando token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await obterUsuarioPorEmail(decoded.id);

        if (!usuario) {
            console.log('Usuário não encontrado');
            return null;
        }

        // Atualizando senha usando a função existente no userService.js
        const usuarioAtualizado = await atualizarUsuario(usuario.id, null, null, novaSenha, null);

        console.log('Senha redefinida com sucesso');
        return { mensagem: 'Senha redefinida com sucesso', usuario: usuarioAtualizado };
    } catch (erro) {
        console.error('Erro ao redefinir senha:', erro);
        throw erro;
    }
}

module.exports = { solicitarRedefinicaoSenha, redefinirSenha };
