import paradaService from '../../../../services/stopService.js';  
import routeService from '../../../../services/routeService.js'; 
import { addParadasMapa, localizarParada } from './map.js';

// Função para carregar as paradas no dropdown
async function carregarParadasNoDropdown() {
    const dropdown = document.getElementById('stopDropdown');
    dropdown.innerHTML = '';

    const optionDefault = document.createElement('button');
    optionDefault.classList.add('w-full', 'text-left', 'p-2', 'text-sm', 'text-gray-500', 'hover:bg-gray-100');
    optionDefault.textContent = 'Selecione uma rota para visualizar as paradas';
    dropdown.appendChild(optionDefault);
}

// Função para carregar as rotas no dropdown
async function carregarRotasNoDropdown() {
    const dropdown = document.getElementById('busDropdown');
    const resultado = await routeService.listarRotas();

    console.log("Rotas carregadas:", resultado);

    if (resultado.success && Array.isArray(resultado.data)) {
        dropdown.innerHTML = '';

        const optionDefault = document.createElement('button');
        optionDefault.classList.add('w-full', 'text-left', 'p-2', 'text-sm', 'text-gray-500', 'hover:bg-gray-100');
        optionDefault.textContent = 'Selecione uma rota';
        dropdown.appendChild(optionDefault);

        resultado.data.forEach(rota => {
            const option = document.createElement('button');
            option.classList.add('w-full', 'text-left', 'p-2', 'text-sm', 'hover:bg-gray-100');
            option.textContent = rota.nome;
            option.onclick = () => selectRouteOption(rota.nome, rota.id);
            dropdown.appendChild(option);
        });
    } else {
        console.error('Erro ao carregar as rotas:', resultado.message || resultado);
    }
}

// Função para carregar as paradas no mapa e no dropdown
async function carregarParadasPorRota(idRota) {
    const dropdown = document.getElementById('stopDropdown');
    dropdown.innerHTML = '';  
    if (!idRota) {
        const resultado = await paradaService.listarParadas();
        
        if (resultado.success) {
            const paradas = Array.isArray(resultado.data) ? resultado.data : resultado.data.paradas || [];
    
            if (paradas.length === 0) {
                console.warn("Nenhuma parada encontrada.");
            }
    
            const paradasFormatadas = paradas.map(parada => ({
                parada_id: parada.id,
                parada_nome: parada.nome,
                coordenadas: {
                    latitude: parada.latitude,
                    longitude: parada.longitude
                }
            }));
    
            paradasFormatadas.forEach(parada => {
                const option = document.createElement('button');
                option.classList.add('w-full', 'text-left', 'p-2', 'text-sm', 'hover:bg-gray-100');
                option.textContent = parada.parada_nome;
                option.onclick = () => selectStopOption(parada.parada_nome, parada.coordenadas.latitude, parada.coordenadas.longitude);
                dropdown.appendChild(option);
            });
    
            console.log('PARADAS PARA ADICIONAR NO MAPA: ', paradasFormatadas);
    
            addParadasMapa(paradasFormatadas);
        }
    
        if (!resultado.success) {
            console.error('Erro ao carregar as paradas:', resultado.message || resultado);
        }
    } else {
        const resultado = await paradaService.obterParadasPorRotaId(idRota);
        if (resultado.success) {
            const paradas = Array.isArray(resultado.data) ? resultado.data : resultado.data.paradas || [];

            if (paradas.length === 0) {
                console.warn("Nenhuma parada encontrada para essa rota.");
            }

            paradas.forEach(parada => {
                const option = document.createElement('button');
                option.classList.add('w-full', 'text-left', 'p-2', 'text-sm', 'hover:bg-gray-100');
                option.textContent = parada.parada_nome;
                option.onclick = () => selectStopOption(parada.parada_nome, parada.coordenadas.latitude, parada.coordenadas.longitude);
                dropdown.appendChild(option);
            });
            console.log('PARADAS DA ROTA NO MAPA: ', paradas);

            addParadasMapa(paradas);  
        } else {
            console.error('Erro ao carregar as paradas da rota:', resultado.message || resultado);
        }
    }
}

// Função para selecionar uma parada e capturar suas coordenadas
function selectStopOption(nomeParada, latitude, longitude) {
    document.getElementById('stopButtonText').innerText = nomeParada;
    toggleDropdown('stopDropdown', 'stop');
    localizarParada(latitude, longitude);
}

// Função para selecionar a opção da rota e carregar as paradas correspondentes
function selectRouteOption(option, idRota) {
    document.getElementById('busButtonText').innerText = option;
    toggleDropdown('busDropdown', 'bus');

    carregarParadasPorRota(idRota);  // Carrega as paradas da rota selecionada
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

// Verificar se há uma rota selecionada ao carregar a página
function verificarRotaSelecionada() {
    const selectedRoute = document.getElementById('busButtonText').innerText;
    if (!selectedRoute || selectedRoute === 'Selecionar Rota') {
        carregarParadasPorRota();
    }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    carregarRotasNoDropdown();
    carregarParadasNoDropdown(); 
    verificarRotaSelecionada();

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
