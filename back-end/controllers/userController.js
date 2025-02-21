const { password } = require('pg/lib/defaults.js');
const usuarioService = require('../services/user/userService.js');
const passwordResetService = require('../services/user/passwordResetService.js'); 


async function criarUsuario(req, res) {
    try {
        const { nome, email, senha, motorista } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
        }

        const novoUsuario = await usuarioService.inserirUsuario(nome, email, senha, motorista);

        return res.status(201).json(novoUsuario); 
    } catch (erro) {
        console.error('Erro ao criar usuário:', erro);
        return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
}

// Listar todos os usuários
async function listarUsuarios(req, res) {
    try {
        const usuarios = await usuarioService.obterUsuarios();
        return res.status(200).json(usuarios); 
    } catch (erro) {
        console.error('Erro ao listar usuários:', erro);
        return res.status(500).json({ message: 'Erro ao listar usuários' });
    }
}

// Buscar usuário pelo email
async function obterUsuarioPorEmail(req, res) {
    try {
        const { email } = req.params;

        const usuario = await usuarioService.obterUsuarioPorEmail(email);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json(usuario); 
    } catch (erro) {
        console.error('Erro ao buscar usuário:', erro);
        return res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
}

// Atualizar informações do usuário
async function atualizarUsuario(req, res) {
    try {
        const { id_usuario } = req.params;
        const { nome, email, senha, motorista } = req.body;

        const usuarioAtualizado = await usuarioService.atualizarUsuario(id_usuario, nome, email, senha, motorista);

        if (!usuarioAtualizado) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json(usuarioAtualizado); 
    } catch (erro) {
        console.error('Erro ao atualizar usuário:', erro);
        return res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
}

// Excluir usuário
async function excluirUsuario(req, res) {
    try {
        const { id_usuario } = req.params;

        const usuarioExcluido = await usuarioService.excluirUsuario(id_usuario);

        if (!usuarioExcluido) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json({ message: 'Usuário excluído com sucesso' }); 
    } catch (erro) {
        console.error('Erro ao excluir usuário:', erro);
        return res.status(500).json({ message: 'Erro ao excluir usuário' });
    }
}

const redefinirSenha = async (req, res) => {
    const { token, novaSenha } = req.body;

    if (!token || !novaSenha) {
        return res.status(400).json({ mensagem: 'Token e nova senha são obrigatórios' });
    }

    try {
        const resultado = await passwordResetService.redefinirSenha(token, novaSenha);

        if (resultado) {
            return res.status(200).json(resultado);
        } else {
            return res.status(400).json({ mensagem: 'Erro ao redefinir senha' });
        }
    } catch (erro) {
        console.error('Erro no controller:', erro);
        return res.status(500).json({ mensagem: 'Erro interno ao redefinir a senha' });
    }
};

module.exports = { criarUsuario, listarUsuarios, obterUsuarioPorEmail, atualizarUsuario, excluirUsuario, redefinirSenha };
