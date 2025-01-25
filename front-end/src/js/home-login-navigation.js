document.addEventListener('DOMContentLoaded', () => {
    // Botões
    const alunoButton = document.getElementById('alunoButton');
    const motoristaButton = document.getElementById('motoristaButton');

    // Navegação ao clicar no botão "Aluno"
    if (alunoButton) {
        alunoButton.addEventListener('click', () => {
            // Redireciona para a rota '/localizacao/onibus'
            window.location.href = '/localizacao/onibus';  
        });
    }

    // Navegação ao clicar no botão "Motorista"
    if (motoristaButton) {
        motoristaButton.addEventListener('click', () => {
            // Redireciona para a rota '/login'
            window.location.href = '/login';  
        });
    }
});
