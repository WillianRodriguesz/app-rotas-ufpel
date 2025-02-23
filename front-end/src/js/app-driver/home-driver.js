import { startGeolocation, clearGeolocation, getCurrentLocation } from '../../../services/geolocationService.js';
import routeService from '../../../services/routeService.js'; 
import { enviarDadosMotorista } from '../../../services/socketService.js';

document.addEventListener("DOMContentLoaded", async function () {
    const button = document.querySelector(".driverButton");
    const statusText = document.querySelector(".driverStatus");
    const statusCircle = document.querySelector(".statusCircle");
    const locationContainer = document.querySelector(".locationContainer");
    const nomeMotoristaElement = document.querySelector(".driverName");
    const routeSelect = document.getElementById("routeSelect");
    const timeSelect = document.getElementById("timeSelect");
    const accessibilitySelect = document.getElementById("accessibilitySelect");

    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    nomeMotoristaElement.textContent = usuario.nome;

    let locationUpdateInterval = null;

    // Função para carregar as rotas
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

    // Função para validar se todos os campos estão preenchidos
    function validarCampos() {
        const rotaSelecionada = routeSelect.value;
        const horarioSelecionado = timeSelect.value;
        const acessibilidadeSelecionada = accessibilitySelect.value;

        // Verifica se todos os campos estão preenchidos
        return rotaSelecionada && horarioSelecionado && acessibilidadeSelecionada;
    }

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

    setOfflineState(); // Inicia OFFLINE

    button.addEventListener("click", function () {
        const isOnline = button.classList.contains("driverButtonOnline");

        if (isOnline) {
            console.log("Mudando para Offline...");
            setOfflineState();
        } else {
            console.log("Mudando para Online...");
            
            // Verifica se todos os campos estão preenchidos antes de ficar online
            if (!validarCampos()) {
                // Exibe um alerta com SweetAlert
                Swal.fire({
                    icon: 'error',
                    title: 'Campos obrigatórios não preenchidos',
                    text: 'Por favor, preencha todos os campos de rota, horário e acessibilidade antes de ficar online.',
                    confirmButtonText: 'OK'
                });
                return; // Não permite ficar online se os campos não estiverem preenchidos
            }

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
                const horarioDaRota = timeSelect.value || 'Sem horário definido'; // Obtém o horário selecionado
                const acessibilidade = accessibilitySelect.value || 'Sem acessibilidade definida'; // Obtém a acessibilidade selecionada

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
                    const horarioDaRota = timeSelect.value || 'Sem horário definido';
                    const acessibilidade = accessibilitySelect.value || 'Sem acessibilidade definida';

                    enviarDadosMotorista(usuario.id_usuario, rotaOnibus, horarioDaRota, acessibilidade, location);
                } else {
                    console.log("Aguardando primeira localização...");
                }
            }, 5000);
        }
    });
});
