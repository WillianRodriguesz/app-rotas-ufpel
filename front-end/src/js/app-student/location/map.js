import mockLocations from "../../mocks/location.js";
import paradas from "../../mocks/paradas.js";

// Definição dos ícones antes de usá-los
const busIcon = L.icon({
    iconUrl: '/public/img/iconBus.png', 
    iconSize: [58, 60],         
    iconAnchor: [30, 30],       
    popupAnchor: [0, -32]       
});

const paradaIcon = L.icon({
    iconUrl: '/public/img/iconParada.png', 
    iconSize: [25, 47],         
    iconAnchor: [20, 20],       
    popupAnchor: [-5, -15]       
});

// Inicialização do mapa
const map = L.map('map').setView([-31.780832297261984, -52.323695006471866], 20); 

// Função para adicionar um marcador
function addMarker(lat, lon, message, useCustomIcon = false, icon = undefined) {
    const markerIcon = useCustomIcon ? busIcon : icon;
    const marker = L.marker([lat, lon], { icon: markerIcon }).addTo(map);
    marker.bindPopup(message); 
    marker.on('click', () => {
        marker.openPopup(); 
    });
    markers.push(marker); 
    return marker; 
}

let markers = [];
const marker = addMarker(-31.780157095467167, -52.323734327957766, "Rota Anglo", true);

// Adicionando o layer do mapa
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CartoDB</a>',
}).addTo(map);

// Função para adicionar as paradas no mapa
function addParadasMapa(paradas){
    paradas.forEach(({ position, parada }) => {
        addMarker(position[0], position[1], parada, false, paradaIcon);
    });
}

// Função para simular atualizações de localização
let currentLocationIndex = 0;
function simulateLocationUpdates() {
    setInterval(() => {
        if (currentLocationIndex < mockLocations.length) {
            const newLatLng = mockLocations[currentLocationIndex];
            marker.setLatLng(newLatLng); 
            //map.panTo(newLatLng);       
            currentLocationIndex++;    
        } else {
            currentLocationIndex = 0; 
        }
    }, 2000); 
}

simulateLocationUpdates();
addParadasMapa(paradas);
