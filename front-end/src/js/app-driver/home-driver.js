import { startGeolocation, clearGeolocation, getCurrentLocation } from '../../../services/geolocationService.js';
import routeService from '../../../services/routeService.js'; 
import { enviarDadosMotorista } from '../../../services/socketService.js';

document.addEventListener("DOMContentLoaded", async function () {
    const button = document.querySelector(".driverButton");
    const statusText = document.querySelector(".driverStatus");
    const statusCircle = document.querySelector(".statusCircle");
    const locationContainer = document.querySelector(".locationContainer");
    const nomeMotoristaElement = document.querySelector(".driverName");
    const routeSelect = document.getElementById("routeSelect"); // Obtém o select de rotas

    const usuario = JSON.parse(sessionStorage.getItem('usuario')); 
    nomeMotoristaElement.textContent = usuario.nome;  

    let locationUpdateInterval = null; // Para controlar o intervalo de atualização

    async function carregarRotas() {
        try {
            const rotas = await routeService.listarRotas();

            console.log('rotas encontradas: ', rotas.data);

            if (rotas.data.length > 0) {
                routeSelect.innerHTML = '<option value="">Selecione a Rota</option>';
                rotas.data.forEach(rota => {
                    const option = document.createElement("option");
                    option.value = rota.id; 
                    option.textContent = rota.nome; 
                    routeSelect.appendChild(option);
                });
            } else {
                console.warn("Nenhuma rota encontrada.");
            }
        } catch (error) {
            console.error("Erro ao carregar rotas:", error);
        }
    }

    await carregarRotas(); // Chama a função para carregar as rotas ao iniciar

    // 🔹 Garantir que a página inicie como OFFLINE
    function setOfflineState() {
        button.classList.remove("driverButtonOnline");
        button.classList.add("driverButtonOffline");
        button.querySelector(".driverButtonText").textContent = "Ficar Online";

        statusText.classList.remove("driverStatusOnline");
        statusText.classList.add("driverStatusOffline");
        statusText.textContent = "OFFLINE";

        statusCircle.classList.remove("statusCircleOnline");
        statusCircle.classList.add("statusCircleOffline");

        locationContainer.innerHTML = '<p>Localização desativada.</p>';
        
        clearGeolocation();
        if (locationUpdateInterval) {
            clearInterval(locationUpdateInterval); 
        }
    }

    setOfflineState(); // Chama a função para iniciar OFFLINE

    button.addEventListener("click", function () {
        const isOnline = button.classList.contains("driverButtonOnline");

        if (isOnline) {
            console.log("Mudando para Offline...");
            setOfflineState();
        } else {
            console.log("Mudando para Online...");
            
            // Alterar botão e status para online
            button.classList.remove("driverButtonOffline");
            button.classList.add("driverButtonOnline");
            button.querySelector(".driverButtonText").textContent = "Ficar Offline";

            statusText.classList.remove("driverStatusOffline");
            statusText.classList.add("driverStatusOnline");
            statusText.textContent = "ONLINE";

            statusCircle.classList.remove("statusCircleOffline");
            statusCircle.classList.add("statusCircleOnline");

            // Iniciar geolocalização
            startGeolocation(true, (location) => {
                const { latitude, longitude, accuracy } = location;
                console.log(`Primeira localização recebida: Latitude: ${latitude}, Longitude: ${longitude}, Precisão: ${accuracy}`);
                
                locationContainer.innerHTML = `
                    <p>Latitude: ${latitude.toFixed(6)}</p>
                    <p>Longitude: ${longitude.toFixed(6)}</p>
                    <p>Precisão: ${accuracy.toFixed(2)} metros</p>
                `;

                const rotaOnibus = routeSelect.value || 'Sem rota definida'; // Obtém a rota selecionada
                const horarioDaRota = "08:00"; // Substitua pelo valor real
                const acessibilidade = "Sim"; // Substitua pelo valor real

                enviarDadosMotorista(usuario.id_usuario, rotaOnibus, horarioDaRota, acessibilidade, location);
            });

            locationUpdateInterval = setInterval(() => {
                const location = getCurrentLocation();
                if (location) {
                    const { latitude, longitude, accuracy } = location;
                    console.log(`Localização atualizada: Latitude: ${latitude}, Longitude: ${longitude}, Precisão: ${accuracy}`);

                    locationContainer.innerHTML = `
                        <p>Latitude: ${latitude.toFixed(6)}</p>
                        <p>Longitude: ${longitude.toFixed(6)}</p>
                        <p>Precisão: ${accuracy.toFixed(2)} metros</p>
                    `;

                    // Enviar os dados com a rota selecionada
                    const rotaOnibus = routeSelect.value || 'Sem rota definida';
                    const horarioDaRota = "08:00"; 
                    const acessibilidade = "Sim"; 

                    enviarDadosMotorista(usuario.id_usuario, rotaOnibus, horarioDaRota, acessibilidade, location);
                } else {
                    console.log("Aguardando primeira localização...");
                }
            }, 5000);
        }
    });
});
