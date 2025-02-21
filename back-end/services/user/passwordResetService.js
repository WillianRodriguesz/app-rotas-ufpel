const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const Usuario = require('../../models/userModel.js'); 
require('dotenv').config();

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function solicitarRedefinicaoSenha(email) {
    try {
        const usuario = await Usuario.findOne({ where: { email: email.toLowerCase() } });

        if (!usuario) {
            console.log('Usuário não encontrado');
            return null;
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const resetLink = `${process.env.FRONTEND_URL}/redefinir-senha/${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: usuario.email,
            subject: 'Redefinição de Senha',
            html: `
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Redefinição de Senha - Rotas UFPel</title>
                </head>
                <body style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <h2 style="color: #0056b3; text-align: center;">Redefinição de Senha - Rotas UFPel</h2>
                        <p>Olá, <strong>${usuario.nome}</strong>!</p>
                        <p>Recebemos uma solicitação para redefinir a sua senha no sistema <strong>Rotas UFPel</strong>. Para continuar, basta clicar no link abaixo:</p>
                        <p style="text-align: center;">
                            <a href="${resetLink}" style="background-color: #0056b3; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Redefinir minha senha</a>
                        </p>
                        <p style="text-align: center;">Esse link ficará disponível por 1 hora a partir deste momento.</p>
                        <p style=Caso não tenha feito essa solicitação, ignore este e-mail.</p>
                        <p style=color: #888; font-size: 12px;">Atenciosamente,<br>Equipe Rotas UFPel</p>
                    </div>
                </body>
                </html>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('E-mail de redefinição de senha enviado com sucesso');

        return { mensagem: 'E-mail enviado com sucesso' };
    } catch (erro) {
        console.error('Erro ao solicitar redefinição de senha:', erro);
        throw erro;
    }
}

async function redefinirSenha(token, novaSenha) {
    try {
        // Verificando token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findByPk(decoded.id);

        if (!usuario) {
            console.log('Usuário não encontrado');
            return null;
        }

        // Hash da nova senha
        usuario.senha = await bcrypt.hash(novaSenha, 10);
        await usuario.save();

        console.log('Senha redefinida com sucesso');
        return { mensagem: 'Senha redefinida com sucesso' };
    } catch (erro) {
        console.error('Erro ao redefinir senha:', erro);
        throw erro;
    }
}

module.exports = { solicitarRedefinicaoSenha, redefinirSenha };
