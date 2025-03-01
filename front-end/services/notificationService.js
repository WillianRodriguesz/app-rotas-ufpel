const notificacaoService = {
    async listarNotificacoes() {
        try {
            const response = await fetch('/notificacoes');
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao buscar notificações:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async listarNotificacoesAtivas() {
        try {
            const response = await fetch(`/notificacoes/ativas`);
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao buscar notificações ativas:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async obterNotificacaoPorId(id) {
        try {
            const response = await fetch(`/notificacoes/${id}`);
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao buscar notificação:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async criarNotificacao(titulo, mensagem, dataEnvio, duracao) {
        try {
            const response = await fetch('/notificacoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titulo,
                    mensagem,
                    dataEnvio,
                    duracao,
                }),
            });
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao criar notificação:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async atualizarNotificacao(id, titulo, mensagem, dataEnvio, duracao) {
        try {
            const response = await fetch(`/notificacoes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titulo,
                    mensagem,
                    dataEnvio,
                    duracao,
                }),
            });
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao atualizar notificação:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async excluirNotificacao(id) {
        try {
            const response = await fetch(`/notificacoes/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                return { success: true };
            } else {
                const result = await response.json();
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao excluir notificação:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    }
};

export default notificacaoService;
