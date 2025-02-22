const notificacaoService = require('../services/notication/notificacaoService');

async function criarNotificacao(req, res) {
    try {
        const { titulo, mensagem, dataEnvio, duracao } = req.body;
        const notificacao = await notificacaoService.inserirNotificacao(titulo, mensagem, dataEnvio, duracao);
        return res.status(201).json(notificacao);
    } catch (erro) {
        console.error('Erro ao criar notificação:', erro);
        return res.status(500).json({ mensagem: 'Erro ao criar notificação', erro });
    }
}

async function listarNotificacoes(req, res) {
    try {
        const notificacoes = await notificacaoService.obterNotificacoes();
        return res.status(200).json(notificacoes);
    } catch (erro) {
        console.error('Erro ao listar notificações:', erro);
        return res.status(500).json({ mensagem: 'Erro ao listar notificações', erro });
    }
}

async function listarNotificacoesAtivas(req, res) {
    try {
        const { dataHoraUsuario } = req.params; 
        if (!dataHoraUsuario) {
            return res.status(400).json({ mensagem: 'Data e hora do usuário são obrigatórias' });
        }

        const notificacoesAtivas = await notificacaoService.obterNotificacoesAtivas(dataHoraUsuario);
        return res.status(200).json(notificacoesAtivas);
    } catch (erro) {
        console.error('Erro ao listar notificações ativas:', erro);
        return res.status(500).json({ mensagem: 'Erro ao listar notificações ativas', erro });
    }
}

async function obterNotificacaoPorId(req, res) {
    try {
        const { id } = req.params;
        const notificacao = await notificacaoService.obterNotificacaoPorId(id);

        if (!notificacao) {
            return res.status(404).json({ mensagem: 'Notificação não encontrada' });
        }

        return res.status(200).json(notificacao);
    } catch (erro) {
        console.error('Erro ao buscar notificação:', erro);
        return res.status(500).json({ mensagem: 'Erro ao buscar notificação', erro });
    }
}

async function atualizarNotificacao(req, res) {
    try {
        const { id } = req.params;
        const { titulo, mensagem, dataEnvio, duracao } = req.body;

        const notificacaoAtualizada = await notificacaoService.atualizarNotificacao(id, titulo, mensagem, dataEnvio, duracao);

        if (!notificacaoAtualizada) {
            return res.status(404).json({ mensagem: 'Notificação não encontrada' });
        }

        return res.status(200).json(notificacaoAtualizada);
    } catch (erro) {
        console.error('Erro ao atualizar notificação:', erro);
        return res.status(500).json({ mensagem: 'Erro ao atualizar notificação', erro });
    }
}

async function excluirNotificacao(req, res) {
    try {
        const { id } = req.params;
        const notificacaoExcluida = await notificacaoService.excluirNotificacao(id);

        if (!notificacaoExcluida) {
            return res.status(404).json({ mensagem: 'Notificação não encontrada' });
        }

        return res.status(200).json({ mensagem: 'Notificação excluída com sucesso', notificacao: notificacaoExcluida });
    } catch (erro) {
        console.error('Erro ao excluir notificação:', erro);
        return res.status(500).json({ mensagem: 'Erro ao excluir notificação', erro });
    }
}

module.exports = { 
    criarNotificacao, 
    listarNotificacoes, 
    listarNotificacoesAtivas, 
    obterNotificacaoPorId, 
    atualizarNotificacao, 
    excluirNotificacao 
};
