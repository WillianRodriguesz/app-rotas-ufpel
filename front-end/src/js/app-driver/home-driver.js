import { startGeolocation, clearGeolocation, getCurrentLocation } from '../../../services/geolocationService.js';
import routeService from '../../../services/routeService.js'; 
import { enviarDadosMotorista, desconectar } from '../../../services/socketService.js';

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

    function getSelectedText(selectElement) {
        const selectedIndex = selectElement.selectedIndex;
        return selectElement.options[selectedIndex].text;
    }

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

        clearGeolocation();
        if (locationUpdateInterval) {
            clearInterval(locationUpdateInterval);
        }

        routeSelect.value = '';
        timeSelect.value = '';
        accessibilitySelect.value = '';
    }

    setOfflineState(); 

    button.addEventListener("click", function () {
        const isOnline = button.classList.contains("driverButtonOnline");

        if (isOnline) {
            console.log("Mudando para Offline...");
            desconectar();
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
                const rotaOnibus = getSelectedText(routeSelect) || 'Sem rota definida'; // Pega o texto da rota selecionada
                const horarioDaRota = timeSelect.value || 'Sem horário definido'; // Obtém o horário selecionado
                const acessibilidade = accessibilitySelect.value || 'Sem acessibilidade definida'; // Obtém a acessibilidade selecionada

                console.log('rota do onibus', rotaOnibus);

                enviarDadosMotorista(usuario.id_usuario, rotaOnibus, horarioDaRota, acessibilidade, location);
            });

            locationUpdateInterval = setInterval(() => {
                const location = getCurrentLocation();
                if (location) {
                    const rotaOnibus = getSelectedText(routeSelect) || 'Sem rota definida'; // Pega o texto da rota selecionada
                    const horarioDaRota = timeSelect.value || 'Sem horário definido';
                    const acessibilidade = accessibilitySelect.value || 'Sem acessibilidade definida';
                    console.log('rota do onibus', rotaOnibus);

                    enviarDadosMotorista(usuario.id_usuario, rotaOnibus, horarioDaRota, acessibilidade, location);
                } else {
                    console.log("Aguardando primeira localização...");
                }
            }, 5000);
        }
    });
});
