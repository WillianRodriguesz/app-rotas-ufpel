import { startGeolocation, clearGeolocation, getCurrentLocation } from '../../../services/geolocationService.js';
import { enviarDadosMotorista } from '../../../services/socketService.js';

document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".driverButton");
    const statusText = document.querySelector(".driverStatus");
    const statusCircle = document.querySelector(".statusCircle");
    const locationContainer = document.querySelector(".locationContainer");

    let locationUpdateInterval = null; // Para controlar o intervalo de atualização

    button.addEventListener("click", function () {
        const isOnline = button.classList.contains("driverButtonOnline");

        if (isOnline) {
            // Alterar para Offline
            console.log("Mudando para Offline...");
            button.classList.remove("driverButtonOnline");
            button.classList.add("driverButtonOffline");
            button.querySelector(".driverButtonText").textContent = "Ficar Online";

            statusText.classList.remove("driverStatusOnline");
            statusText.classList.add("driverStatusOffline");
            statusText.textContent = "OFFLINE";

            statusCircle.classList.remove("statusCircleOnline");
            statusCircle.classList.add("statusCircleOffline");

            // Parar geolocalização
            clearGeolocation();
            if (locationUpdateInterval) {
                clearInterval(locationUpdateInterval); // Limpar o intervalo
            }
            locationContainer.innerHTML = '<p>Localização desativada.</p>';
        } else {
            // Alterar para Online
            console.log("Mudando para Online...");
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

                // Enviar dados para o servidor
                const motoristaId = '12345'; // Mockando o ID do motorista
                const mensagem = 'Motorista em movimento';
                const rotaOnibus = 'Rota 42'; // Mockando a rota do ônibus

                // Chamar a função de envio de dados para o servidor
                enviarDadosMotorista(motoristaId, rotaOnibus, location, mensagem);
            });

            // Atualizar localização a cada 5 segundos
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

                    // Mockando dados para enviar
                    const motoristaId = '12345'; // Mockando o ID do motorista
                    const mensagem = 'Motorista em movimento';
                    const rotaOnibus = 'Rota 42'; // Mockando a rota do ônibus

                    // Enviar os dados para o servidor
                    enviarDadosMotorista(motoristaId, rotaOnibus, location, mensagem);
                } else {
                    console.log("Aguardando primeira localização...");
                }
            }, 5000); // 5 segundos
        }
    });
});
