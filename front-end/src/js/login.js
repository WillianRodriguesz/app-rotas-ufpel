document.addEventListener('DOMContentLoaded', () => {
    // Botão de Voltar
    const voltarButton = document.getElementById('voltarButton');
    if (voltarButton) {
        voltarButton.addEventListener('click', () => {
            window.location.href = '/home/login'; 
        });
    }
    // Formulário de Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
    
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            const result = await response.json();
            if (response.ok) {
                window.location.href = '/localizacao/motorista'; 
            } else {
                alert(result.message);
            }
        });
    }
});
