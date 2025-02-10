import paradaService from '../../../../services/stopService.js';  // Serviço de paradas
import routeService from '../../../../services/routeService.js';  // Serviço de rotas

// Função para carregar as paradas no dropdown
async function carregarParadasNoDropdown() {
    const dropdown = document.getElementById('stopDropdown');
    const resultado = await paradaService.listarParadas();

    if (resultado.success) {
        dropdown.innerHTML = '';

        const optionDefault = document.createElement('button');
        optionDefault.classList.add('w-full', 'text-left', 'p-2', 'text-sm', 'text-gray-500', 'hover:bg-gray-100');
        optionDefault.textContent = 'Selecione uma parada';
        dropdown.appendChild(optionDefault);

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

// Função para carregar as rotas no dropdown
async function carregarRotasNoDropdown() {
    const dropdown = document.getElementById('busDropdown');
    const resultado = await routeService.listarRotas();

    if (resultado.success) {
        dropdown.innerHTML = '';

        const optionDefault = document.createElement('button');
        optionDefault.classList.add('w-full', 'text-left', 'p-2', 'text-sm', 'text-gray-500', 'hover:bg-gray-100');
        optionDefault.textContent = 'Selecione uma rota';
        dropdown.appendChild(optionDefault);

        resultado.data.forEach(rota => {
            const option = document.createElement('button');
            option.classList.add('w-full', 'text-left', 'p-2', 'text-sm', 'hover:bg-gray-100');
            option.textContent = rota.nome;
            option.onclick = () => selectRouteOption(rota.nome);
            dropdown.appendChild(option);
        });
    } else {
        console.error('Erro ao carregar as rotas:', resultado.message);
    }
}

// Função para alternar a visibilidade do dropdown
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

// Função para selecionar a opção da parada
function selectStopOption(option) {
    const selectedOption = option; 
    document.getElementById('stopButtonText').innerText = selectedOption; 
    toggleDropdown('stopDropdown', 'stop'); 
}

// Função para selecionar a opção da rota
function selectRouteOption(option) {
    const selectedOption = option; 
    document.getElementById('busButtonText').innerText = selectedOption; 
    toggleDropdown('busDropdown', 'bus'); 
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    carregarParadasNoDropdown();  // Carrega as paradas ao carregar a página
    carregarRotasNoDropdown();   // Carrega as rotas ao carregar a página

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
