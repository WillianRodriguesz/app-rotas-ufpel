import mockLocations from "./mocks/location.js";
import paradas from "./mocks/paradas.js";

const map = L.map('map').setView([-31.780832297261984, -52.323695006471866], 20); // Posição inicial

// Adiciona tiles do CartoDB Positron
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CartoDB</a>',
}).addTo(map);

// Armazenar referências de marcadores e rotas
let markers = [];
let routes = [];

// Define o ícone personalizado para o ônibus
const customIcon = L.icon({
    iconUrl: '/public/img/iconBus.png', 
    iconSize: [60, 60],         
    iconAnchor: [30, 30],       
    popupAnchor: [0, -32]       
});

// Define um ícone básico para as paradas
const paradaIcon = L.icon({
    iconUrl: '/public/img/iconParada.png', // Caminho para o ícone das paradas
    iconSize: [25, 47],         
    iconAnchor: [20, 20],       
    popupAnchor: [-5, -15]       
});

// Função para adicionar um marcador
function addMarker(lat, lon, message, useCustomIcon = false, icon = undefined) {
    const markerIcon = useCustomIcon ? customIcon : icon;
    const marker = L.marker([lat, lon], { icon: markerIcon }).addTo(map);
    marker.bindPopup(message); 
    marker.on('click', () => {
        marker.openPopup(); 
    });
    markers.push(marker); 
    return marker; 
}

// Função para adicionar uma rota
function addRoute(latlngs, color = 'blue') {
    const polyline = L.polyline(latlngs, { color }).addTo(map);
    routes.push(polyline); 
    map.fitBounds(polyline.getBounds());
}

// Função para limpar o mapa
function clearMap() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    routes.forEach(route => map.removeLayer(route));
    routes = [];
}

// Adiciona o marcador inicial com ícone customizado (ônibus)
const marker = addMarker(-31.780157095467167, -52.323734327957766, "Rota Anglo", true);

// Adiciona marcadores para as paradas
paradas.forEach(({ position, parada }) => {
    addMarker(position[0], position[1], parada, false, paradaIcon);
});

// Função para simular atualizações de localização
let currentLocationIndex = 0;
function simulateLocationUpdates() {
    setInterval(() => {
        if (currentLocationIndex < mockLocations.length) {
            const newLatLng = mockLocations[currentLocationIndex];
            marker.setLatLng(newLatLng); 
            map.panTo(newLatLng);       
            currentLocationIndex++;    
        } else {
            currentLocationIndex = 0; 
        }
    }, 2000); // Atualiza a cada 2 segundos
}

// Inicia a simulação de atualizações de localização
simulateLocationUpdates();
