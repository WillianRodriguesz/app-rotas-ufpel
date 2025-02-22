const sequelize = require('../../config/config');

async function inserirNotificacao(titulo, mensagem, dataEnvio, duracao) {
    try {
        const query = `
            INSERT INTO notificacoes (titulo, mensagem, data_envio, duracao)
            VALUES (:titulo, :mensagem, :dataEnvio, :duracao)
            RETURNING *;
        `;
        
        const resultado = await sequelize.query(query, {
            replacements: { titulo, mensagem, dataEnvio, duracao },
            type: sequelize.QueryTypes.INSERT
        });

        return resultado[0]; 
    } catch (erro) {
        console.error('Erro ao inserir notificação:', erro);
        throw erro;
    }
}

async function obterNotificacoes() {
    try {
        const query = `
            SELECT id, titulo, mensagem, data_envio, duracao, criado_em
            FROM notificacoes;
        `;
        
        const notificacoes = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });

        return notificacoes;
    } catch (erro) {
        console.error('Erro ao listar notificações:', erro);
        throw erro;
    }
}

async function obterNotificacaoPorId(id) {
    try {
        const query = `
            SELECT id, titulo, mensagem, data_envio, duracao, criado_em
            FROM notificacoes
            WHERE id = :id;
        `;

        const notificacao = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });

        return notificacao[0]; 
    } catch (erro) {
        console.error('Erro ao buscar notificação:', erro);
        throw erro;
    }
}

async function obterNotificacoesAtivas(dataHoraUsuario) {
    try {
        const query = `
        SELECT * FROM notificacoes
        WHERE 
            '2025-02-21 22:42:00'::timestamp BETWEEN data_envio AND (data_envio + duracao * INTERVAL '1 hour');
        `;
        const notificacoesAtivas = await sequelize.query(query, {
            replacements: { dataHoraUsuario },
            type: sequelize.QueryTypes.SELECT
        });

        return notificacoesAtivas;
    } catch (erro) {
        console.error('Erro ao listar notificações ativas:', erro);
        throw erro;
    }
}

async function atualizarNotificacao(id, titulo, mensagem, dataEnvio, duracao) {
    try {
        const query = `
            UPDATE notificacoes
            SET titulo = :titulo,
                mensagem = :mensagem,
                data_envio = :dataEnvio,
                duracao = :duracao
            WHERE id = :id
            RETURNING *;
        `;

        const resultado = await sequelize.query(query, {
            replacements: { id, titulo, mensagem, dataEnvio, duracao },
            type: sequelize.QueryTypes.UPDATE
        });

        return resultado[0]; 
    } catch (erro) {
        console.error('Erro ao atualizar notificação:', erro);
        throw erro;
    }
}

async function excluirNotificacao(id) {
    try {
        const query = `
            DELETE FROM notificacoes
            WHERE id = :id
            RETURNING *;
        `;

        const resultado = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.DELETE
        });

        return resultado[0]; // Retorna a notificação excluída
    } catch (erro) {
        console.error('Erro ao excluir notificação:', erro);
        throw erro;
    }
}

module.exports = { 
    inserirNotificacao, 
    obterNotificacoes, 
    obterNotificacaoPorId, 
    obterNotificacoesAtivas, 
    atualizarNotificacao, 
    excluirNotificacao 
};
