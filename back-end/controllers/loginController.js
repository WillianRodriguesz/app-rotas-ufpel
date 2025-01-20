const motoristaService = require('../services/user/userService.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.JWT_SECRET;

// Função para autenticar usuário e armazenar o token no cookie
async function autenticarUsuario(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        const motorista = await motoristaService.obterMotoristaPorEmail(email);

        if (!motorista) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const senhaCorreta = await bcrypt.compare(senha, motorista.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: motorista.id, nome: motorista.nome, email: motorista.email, admin: motorista.admin },
            secretKey,
            { expiresIn: '3h' } 
        );

        // Armazena o token no cookie
        res.cookie('auth_token', token, {
            httpOnly: true, 
            secure: true, 
            maxAge: 3 * 60 * 60 * 1000, 
            sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax', 
        });

        return res.status(200).json({ message: 'Login realizado com sucesso.' });
    } catch (erro) {
        console.error('Erro ao autenticar usuário:', erro);
        return res.status(500).json({ message: 'Erro ao autenticar usuário.' });
    }
}

// Função para logout 
async function fazerLogout(req, res) {
    try {
        res.clearCookie('auth_token'); 
        return res.status(200).json({ message: 'Logout realizado com sucesso.' });
    } catch (erro) {
        console.error('Erro ao fazer logout:', erro);
        return res.status(500).json({ message: 'Erro ao fazer logout.' });
    }
}

module.exports = { autenticarUsuario, fazerLogout };
