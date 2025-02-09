import loginService from '../../../services/loginService.js'

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
                window.location.href = '/localizacao/motorista'; 
            } else {
                alert(message);
            }
        });
    }
});
