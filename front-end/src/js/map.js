// Inicializa o mapa
const map = L.map('map').setView([-31.780832297261984, -52.323695006471866], 20); // Posição inicial

// Adiciona tiles do CartoDB Positron
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CartoDB</a>',
}).addTo(map);

// Armazenar referências de marcadores e rotas
let markers = [];
let routes = [];

// Função para adicionar um marcador
function addMarker(lat, lon, message) {
    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(message).openPopup();
    markers.push(marker); // Armazena o marcador
    return marker; // Retorna o marcador para controle posterior
}

// Função para adicionar uma rota
function addRoute() {
    const latlngs = [
        [-31.780832297261984, -52.323695006471866],
        [-31.780157095467167, -52.323734327957766],
        [-31.780157095467167, -52.323734327957766],
    ];

    const polyline = L.polyline(latlngs, { color: 'blue' }).addTo(map);
    routes.push(polyline); // Armazena a rota
    map.fitBounds(polyline.getBounds());
}

// Função para limpar o mapa
function clearMap() {
    markers.forEach(marker => {
        map.removeLayer(marker);
    });
    markers = [];

    routes.forEach(route => {
        map.removeLayer(route);
    });
    routes = [];
}

// Dados mockados de localização (simula uma mudança de coordenadas)
const mockLocations = [
    [-31.78118233495962, -52.32371981350748],
    [-31.780271110092038, -52.32379039527901],
    [-31.780063121258635, -52.32392130126933],
    [-31.780662428124717, -52.32608836604281],
    [-31.78066604107426, -52.326159960976206],
    [-31.780586245771794, -52.32655027784289],
    [-31.778507900087504, -52.333505949794535],
    [-31.781225500049477, -52.33465409477287],
    [-31.779397030378746, -52.34081962921275],
    [-31.77572561164023, -52.33926830964254], // campus 2
    [-31.77569528552374, -52.339257466446135],
    [-31.7759772139352, -52.33838816496157],
    [-31.77625135150096, -52.33744911098334], 
    [-31.777189171048494, -52.33785205446799], 
    [-31.77689136110633, -52.3387750729754], 
    [-31.77529556342421, -52.34417625219015],
    [-31.77908353970484, -52.345737425718575],
    [-31.77751179815117, -52.3511916307895],
    [-31.77544933872902, -52.350283848819984],
    [-31.775101038005374, -52.35145138084516],
    [-31.772301492712337, -52.35025742608794],
    [-31.77295132634783, -52.34807107092122],
    [-31.77197655650708, -52.34759710716901],
    [-31.77294937495755, -52.34436368588353],
    [-31.771901378895187, -52.34392175526549],
    [-31.772188081386027, -52.34288668672046],
    [-31.775287241789705, -52.34420845689264], 
    [-31.771278453484406, -52.34250293274953],
    [-31.773204177988298, -52.33616838341954],
    [-31.77410628713858, -52.33654607235083],
    [-31.773525103417974, -52.33838912246313],
    [-31.77612268539401, -52.339448950254436]
];

// Adiciona o marcador inicial
const marker = addMarker(-31.780157095467167, -52.323734327957766, "Bem-vindo! Esta é a sua localização inicial.");
addRoute();

// Função para mover o marcador com dados mockados
let currentLocationIndex = 0;
function simulateLocationUpdates() {
    setInterval(() => {
        // Atualiza as coordenadas do marcador com a próxima localização dos dados mockados
        if (currentLocationIndex < mockLocations.length) {
            const newLatLng = mockLocations[currentLocationIndex];
            marker.setLatLng(newLatLng); // Atualiza a posição do marcador
            map.panTo(newLatLng); // Move o mapa para a nova posição, sem alterar o zoom
            currentLocationIndex++; // Avança para a próxima localização
        } else {
            currentLocationIndex = 0; // Reseta para o início quando chega no final do array
        }
    }, 2000); // Atualiza a cada 2 segundos (2000 ms)
}

// Inicia a simulação de atualizações de local
simulateLocationUpdates();

// Função para fazer o mapa seguir o cursor
map.on('mousemove', function(e) {
    const latLng = e.latlng; // Captura a posição do mouse no mapa
    map.panTo(latLng); // Move o mapa para o centro da posição do mouse, mas não altera o zoom
});
