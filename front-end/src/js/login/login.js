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
                    console.log('dados usuario', result);

                    console.log('logou buscou usuario agora é motorista?', result.data.motorista);
                    window.location.href = result.motorista ? '/localizacao/motorista' : '/painel';
                } catch (error) {
                    console.error("Erro ao obter usuário:", error);
                    alert("Erro ao buscar informações do usuário.");
                }
            } else {
                alert(message);
            }
        });
    }
});
