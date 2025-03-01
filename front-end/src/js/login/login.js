import loginService from '../../../services/loginService.js'
import userService from '../../../services/userService.js'

document.addEventListener('DOMContentLoaded', () => {
    // Botão de Voltar
    const voltarButton = document.getElementById('voltarButton');
    if (voltarButton) {
        voltarButton.addEventListener('click', () => {
            window.location.href = '/'; 
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            const { success, message } = await loginService.login(email, senha);

            if (success) {
                try {
                    const result = await userService.obterUsuarioPorEmail(email);
                    
                    if(result.data.motorista){
                        const usuarioSessao = {
                            id_usuario: result.data.id_usuario,
                            nome: result.data.nome,
                            email: result.data.email
                        };

                        sessionStorage.setItem('usuario', JSON.stringify(usuarioSessao));
                    }

                    window.location.href = result.data.motorista ? '/localizacao/motorista' : '/painel';
                } catch (error) {
                    console.error("Erro ao obter usuário:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'Erro ao buscar informações do usuário.',
                    });
                }
            } else {
                // Verifique se a mensagem contém 'email' ou 'senha' para personalizar a resposta
                if (message.toLowerCase().includes('email')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Email inválido',
                        text: 'O email informado não foi encontrado.',
                    });
                } else if (message.toLowerCase().includes('senha')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Senha inválida',
                        text: 'A senha informada está incorreta.',
                    });
                } else {
                    // Mensagem genérica caso não seja email nem senha
                    Swal.fire({
                        icon: 'error',
                        title: 'Falha no login',
                        text: message,
                    });
                }
            }
        });
    }
});
