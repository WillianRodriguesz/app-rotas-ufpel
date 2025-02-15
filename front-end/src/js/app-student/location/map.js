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

// Arrays separados para marcadores de ônibus e paradas
let markersBus = [];
let markersParadas = [];

function addMarker(lat, lon, message, useBusIcon) {
    const markerIcon = useBusIcon ? busIcon : paradaIcon; 
    const marker = L.marker([lat, lon], { icon: markerIcon }).addTo(map);

    marker.bindPopup(message); 
    marker.on('click', () => {
        marker.openPopup(); 
    });

    if (useBusIcon) {
        markersBus.push(marker); 
    } else {
        markersParadas.push(marker); 
    }
    return marker; 
}

// Adicionando o layer do mapa
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CartoDB</a>',
}).addTo(map);

// Função para remover marcadores de paradas
function removeParadaMarkers() {
    markersParadas.forEach(marker => {
        marker.remove();
    });
    markersParadas = []; 
}

// Função para adicionar as paradas no mapa
export function addParadasMapa(paradas) {
    console.log('Paradas recebidas no mapa:', paradas);  
    
    removeParadaMarkers();
    paradas.forEach(parada => {
        addMarker(parada.coordenadas.latitude, parada.coordenadas.longitude, parada.parada_nome, false);
    });
}

export function localizarParada(lat, lon, zoomLevel = 18) {
    map.setView([lat, lon], zoomLevel);

    const tolerance = 0.0001; // Pequena margem de erro para comparar coordenadas
    const marker = markersParadas.find(m => {
        const { lat: markerLat, lng: markerLng } = m.getLatLng();
        return Math.abs(markerLat - lat) < tolerance && Math.abs(markerLng - lon) < tolerance;
    });

    if (marker) {
        console.log("Marcador encontrado:", marker.getLatLng()); 
        marker.openPopup();
    } else {
        console.warn("Nenhum marcador encontrado para as coordenadas:", lat, lon);
    }
}
// Função para simular atualizações de localização
let currentLocationIndex = 0;
function simulateLocationUpdates() {
    addMarker(-31.780832297261984, -52.323695006471866, 'teste', true);
    setInterval(() => {
        if (markersBus.length > 0 && currentLocationIndex < mockLocations.length) {
            const newLatLng = mockLocations[currentLocationIndex];
            markersBus[0].setLatLng(newLatLng);  
            //map.panTo(newLatLng);       
            currentLocationIndex++;    
        } else {
            currentLocationIndex = 0; 
        }
    }, 2000); 
}

simulateLocationUpdates();
//addParadasMapa(paradas);
