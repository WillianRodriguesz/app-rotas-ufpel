const paradaService = {
    async listarParadas() {
        try {
            const response = await fetch('/paradas');
            const result = await response.json();
            
            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao buscar paradas:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async obterParadaPorId(id) {
        try {
            const response = await fetch(`/paradas/${id}`);
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao obter parada:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async criarParada(paradaData) {
        try {
            const response = await fetch('/paradas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paradaData),
            });
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao criar parada:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async atualizarParada(id, paradaData) {
        try {
            const response = await fetch(`/paradas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paradaData),
            });
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao atualizar parada:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async excluirParada(id) {
        try {
            const response = await fetch(`/paradas/${id}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                return { success: true };
            } else {
                const result = await response.json();
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao excluir parada:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async obterParadasPorRotaId(idRota) {
        try {
            const response = await fetch(`/rotas/${idRota}/paradas`);
            const result = await response.json();
    
            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao obter paradas por rota:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    }
};

export default paradaService;
