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

// Substituir o texto do botão de ônibus
function selectBusOption(option) {
    document.getElementById('busButtonText').innerText = option;
    toggleDropdown('busDropdown', 'bus');
}

// Substituir o texto do botão de paradas
function selectStopOption(option) {
    document.getElementById('stopButtonText').innerText = option;
    toggleDropdown('stopDropdown', 'stop');
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
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
