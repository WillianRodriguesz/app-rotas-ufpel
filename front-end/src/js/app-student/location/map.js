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

// Função para calcular o tamanho do ícone com base no zoom
function getIconSize(zoom) {
    const baseSizeBus = 58; 
    const baseSizeParadaWidth = 35; 
    const baseSizeParadaHeight = 58; 
    const scaleFactor = Math.pow(1.1, zoom - 20); 

    // Tamanhos ajustados com base no zoom
    const busSize = [baseSizeBus * scaleFactor, baseSizeBus * scaleFactor];
    const paradaSize = [baseSizeParadaWidth * scaleFactor, baseSizeParadaHeight * scaleFactor]; 

    return { busSize, paradaSize }; 
}

// Função para atualizar o tamanho dos ícones com base no zoom
function updateIconSizes() {
    let zoom = map.getZoom(); 
    const { busSize, paradaSize } = getIconSize(zoom); 

    // Atualiza os ícones do ônibus
    markersBus.forEach(marker => {
        marker.setIcon(L.icon({
            iconUrl: '/public/img/iconBus.png',
            iconSize: busSize,
            iconAnchor: [busSize[0] / 2, busSize[1] / 2], 
            popupAnchor: [0, -busSize[1] / 2] 
        }));
    });

    // Atualiza os ícones das paradas
    markersParadas.forEach(marker => {
        marker.setIcon(L.icon({
            iconUrl: '/public/img/iconParada.png',
            iconSize: paradaSize,
            iconAnchor: [paradaSize[0] / 2, paradaSize[1] / 2], 
            popupAnchor: [-5 * (paradaSize[0] / 47), -12 * (paradaSize[1] / 25)] 
        }));
    });
}

// Ouvinte de evento para atualizar os ícones ao mudar o zoom
map.on('zoomend', updateIconSizes);

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
