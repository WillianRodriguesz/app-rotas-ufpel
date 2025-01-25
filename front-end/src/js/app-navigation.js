function toggleDropdown(dropdownId, buttonId) {
    const dropdown = document.getElementById(dropdownId);
    const isVisible = dropdown.style.display === 'block';
    const dropdowns = document.querySelectorAll('.dropdown-content');
    
    dropdowns.forEach(dropdown => dropdown.style.display = 'none');
    dropdown.style.display = isVisible ? 'none' : 'block';
    
    const arrows = document.querySelectorAll('.dropdown-icon');
    arrows.forEach(arrow => arrow.style.transform = 'rotate(0deg)');
    const arrow = document.getElementById(buttonId + 'Arrow');
    arrow.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
}

function selectBusOption(option) {
    document.getElementById('busButtonText').innerText = option;
    toggleDropdown('busDropdown', 'bus');
}

function selectStopOption(option) {
    document.getElementById('stopButtonText').innerText = option;
    toggleDropdown('stopDropdown', 'stop');
}

document.getElementById('busButton').addEventListener('click', function() {
    toggleDropdown('busDropdown', 'bus');
});

document.getElementById('stopButton').addEventListener('click', function() {
    toggleDropdown('stopDropdown', 'stop');
});

window.addEventListener('click', function(event) {
    if (!event.target.matches('#busButton') && !event.target.matches('#stopButton')) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => dropdown.style.display = 'none');
    }
});
