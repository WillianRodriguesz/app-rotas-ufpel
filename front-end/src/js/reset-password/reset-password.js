import userService from '../../../services/userService.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resetPasswordForm');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const novaSenha = document.getElementById('novaSenha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;
        
        // Verifica se as senhas coincidem
        if (novaSenha !== confirmarSenha) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'As senhas não coincidem. Por favor, tente novamente.'
            });
            return;
        }

        // Pegando o token diretamente do path da URL
        const pathname = window.location.pathname;
        const token = pathname.split('/').pop(); // Pega o último valor da URL (token)
        console.log('token JWT:', token);

        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Token não encontrado na URL.'
            });
            return;
        }

        try {
            const result = await userService.redefinirSenha(token, novaSenha);
            
            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Senha redefinida com sucesso!',
                    confirmButtonText: 'Ir para Login'
                }).then(() => {
                    window.location.href = '/login';  // Redireciona para o login
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: result.message || 'Erro ao redefinir senha. Tente novamente mais tarde.'
                });
            }
        } catch (error) {
            console.error('Erro ao tentar redefinir a senha:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro Inesperado',
                text: 'Erro inesperado. Tente novamente mais tarde.'
            });
        }
    });
});
