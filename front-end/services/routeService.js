const routeService = {
    // Função para listar todas as rotas
    async listarRotas() {
        try {
            const response = await fetch('/buscar/rotas');
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao buscar rotas:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    // Função para obter uma rota específica por ID
    async obterRotaPorId(id) {
        try {
            const response = await fetch(`/rotas/${id}`);
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao obter rota:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    // Função para criar uma nova rota
    async criarRota(rotaData) {
        try {
            const response = await fetch('/criar/rotas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rotaData),
            });
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao criar rota:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    // Função para atualizar uma rota existente
    async atualizarRota(id, rotaData) {
        try {
            const response = await fetch(`/rotas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rotaData),
            });
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao atualizar rota:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    // Função para excluir uma rota
    async excluirRota(id) {
        try {
            const response = await fetch(`/rotas/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                return { success: true };
            } else {
                const result = await response.json();
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao excluir rota:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async listarHorariosPorRota(id) {
        try {
            const response = await fetch(`/rotas/${id}/horarios`);
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao buscar horários da rota:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    }
};

export default routeService;
