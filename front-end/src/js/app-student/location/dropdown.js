import paradaService from '../../../../services/stopService.js';

async function carregarParadasNoDropdown() {
    const dropdown = document.getElementById('stopDropdown');
    const resultado = await paradaService.listarParadas();

    if (resultado.success) {
        // Limpa o dropdown antes de adicionar as novas paradas
        dropdown.innerHTML = '';

        // Adiciona uma opção padrão (caso não haja paradas)
        const optionDefault = document.createElement('button');
        optionDefault.classList.add('w-full', 'text-left', 'p-2', 'text-sm', 'text-gray-500', 'hover:bg-gray-100');
        optionDefault.textContent = 'Selecione uma parada';
        dropdown.appendChild(optionDefault);

        // Adiciona as paradas ao dropdown
        resultado.data.forEach(parada => {
            const option = document.createElement('button');
            option.classList.add('w-full', 'text-left', 'p-2', 'text-sm', 'hover:bg-gray-100');
            option.textContent = parada.nome;
            option.onclick = () => selectStopOption(parada.nome);
            dropdown.appendChild(option);
        });
    } else {
        console.error('Erro ao carregar as paradas:', resultado.message);
    }
}

// Função para alternar o dropdown e garantir que só um dropdown esteja visível
function toggleDropdown(dropdownId, buttonId) {
    const dropdown = document.getElementById(dropdownId);
    const isVisible = dropdown.style.display === 'block';
    const dropdowns = document.querySelectorAll('.dropdown-content');
    
    dropdowns.forEach(dropdown => dropdown.style.display = 'none');
    
    dropdown.style.display = isVisible ? 'none' : 'block';
    
    const arrows = document.querySelectorAll('.dropdown-icon');
    arrows.forEach(arrow => arrow.style.transform = 'rotate(0deg)');
    
    const arrow = document.getElementById(buttonId + 'Arrow');
    if (arrow) {
        arrow.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
    }
}

// Substituir o texto do botão de paradas
function selectStopOption(option) {
    const selectedOption = option; 
    document.getElementById('stopButtonText').innerText = selectedOption; 
    toggleDropdown('stopDropdown', 'stop'); 
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    carregarParadasNoDropdown();

    document.getElementById('busButton').addEventListener('click', function() {
        toggleDropdown('busDropdown', 'bus');
    });

    document.getElementById('stopButton').addEventListener('click', function() {
        toggleDropdown('stopDropdown', 'stop');
    });

    // Fecha os dropdowns se o usuário clicar fora deles
    window.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown-button')) {
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });
});
