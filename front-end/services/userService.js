const userService = {
    async criarUsuario(usuarioData) {
        try {
            const response = await fetch('/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioData),
            });
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async listarUsuarios() {
        try {
            const response = await fetch('/usuarios');
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async obterUsuarioPorEmail(email) {
        try {
            const response = await fetch(`/usuarios/${email}`);
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao obter usuário por email:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async atualizarUsuario(id_usuario, usuarioData) {
        try {
            const response = await fetch(`/usuarios/${id_usuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioData),
            });
            const result = await response.json();

            if (response.ok) {
                return { success: true, data: result };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async excluirUsuario(id_usuario) {
        try {
            const response = await fetch(`/usuarios/${id_usuario}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                return { success: true };
            } else {
                const result = await response.json();
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    },

    async redefinirSenha(token, novaSenha) {
        try {
            const response = await fetch('/usuarios/redefinir-senha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, novaSenha }),
            });
            const result = await response.json();
    
            if (response.ok) {
                return { success: true, message: result.mensagem };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    }
};

export default userService;
