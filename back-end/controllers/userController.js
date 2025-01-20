const motoristaService = require('../services/user/userService.js'); // Importa o serviço do motorista

// Função para criar um novo motorista
async function criarMotorista(req, res) {
    try {
        const { nome, email, senha, admin } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
        }

        const novoMotorista = await motoristaService.inserirMotorista(nome, email, senha, admin);

        return res.status(201).json(novoMotorista); 
    } catch (erro) {
        console.error('Erro ao criar motorista:', erro);
        return res.status(500).json({ message: 'Erro ao criar motorista' });
    }
}

async function listarMotoristas(req, res) {
    try {
        const motoristas = await motoristaService.obterMotoristas();
        return res.status(200).json(motoristas); 
    } catch (erro) {
        console.error('Erro ao listar motoristas:', erro);
        return res.status(500).json({ message: 'Erro ao listar motoristas' });
    }
}

async function obterMotoristaPorEmail(req, res) {
    try {
        const { email } = req.params;

        const motorista = await motoristaService.obterMotoristaPorEmail(email);

        if (!motorista) {
            return res.status(404).json({ message: 'Motorista não encontrado' });
        }

        return res.status(200).json(motorista); 
    } catch (erro) {
        console.error('Erro ao buscar motorista:', erro);
        return res.status(500).json({ message: 'Erro ao buscar motorista' });
    }
}

async function atualizarMotorista(req, res) {
    try {
        const { id_motorista } = req.params;
        const { nome, email, senha, admin } = req.body;

        const motoristaAtualizado = await motoristaService.atualizarMotorista(id_motorista, nome, email, senha, admin);

        if (!motoristaAtualizado) {
            return res.status(404).json({ message: 'Motorista não encontrado' });
        }

        return res.status(200).json(motoristaAtualizado); 
    } catch (erro) {
        console.error('Erro ao atualizar motorista:', erro);
        return res.status(500).json({ message: 'Erro ao atualizar motorista' });
    }
}

async function excluirMotorista(req, res) {
    try {
        const { id_motorista } = req.params;

        const motoristaExcluido = await motoristaService.excluirMotorista(id_motorista);

        if (!motoristaExcluido) {
            return res.status(404).json({ message: 'Motorista não encontrado' });
        }

        return res.status(200).json({ message: 'Motorista excluído com sucesso' }); 
    } catch (erro) {
        console.error('Erro ao excluir motorista:', erro);
        return res.status(500).json({ message: 'Erro ao excluir motorista' });
    }
}

module.exports = { criarMotorista, listarMotoristas, obterMotoristaPorEmail, atualizarMotorista, excluirMotorista };
