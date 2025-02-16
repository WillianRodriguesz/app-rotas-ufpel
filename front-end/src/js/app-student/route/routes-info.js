import routeService from '../../../../services/routeService.js';

document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('searchInput'); // Input de busca

    function obterIdRotaDaUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    function agruparParadasPorHorario(dados) {
        const nomeRota = dados.rotas[0]?.rota_nome || 'Rota desconhecida';
        const nomeRotaElemento = document.querySelector('h3.text-lg.font-bold.text-gray-800');
        if (nomeRotaElemento) {
            nomeRotaElemento.textContent = nomeRota;
        }

        const horariosAgrupados = dados.rotas.reduce((acc, item) => {
            if (!acc[item.horario]) {
                acc[item.horario] = [];
            }
            acc[item.horario].push(item);
            return acc;
        }, {});

        const containerHorarios = document.querySelector('.mt-2.space-y-4');
        containerHorarios.innerHTML = '';

        Object.keys(horariosAgrupados).forEach((horario) => {
            const paradas = horariosAgrupados[horario];
            paradas.sort((a, b) => a.ordem - b.ordem);

            const cardHorario = document.createElement('div');
            cardHorario.classList.add('border-t', 'pt-4');
            
            const divHora = document.createElement('div');
            divHora.classList.add('flex', 'items-center', 'space-x-2');
            
            const iconeRelogio = document.createElement('i');
            iconeRelogio.classList.add('fa-solid', 'fa-clock', 'text-blue-600', 'text-lg');
            
            const spanHora = document.createElement('span');
            spanHora.classList.add('text-blue-600', 'font-bold', 'text-lg');
            
            const horarioFormatado = horario.substring(0, 5);
            spanHora.textContent = horarioFormatado;
            
            const paragrafoParadas = document.createElement('p');
            paragrafoParadas.classList.add('text-sm', 'text-gray-600', 'mt-1');
            const listaParadas = paradas.map(parada => parada.parada_nome).join(' → ');
            paragrafoParadas.innerHTML = `<span class="font-bold">Paradas:</span> ${listaParadas}`;
            
            divHora.append(iconeRelogio, spanHora);
            cardHorario.append(divHora, paragrafoParadas);
            containerHorarios.append(cardHorario);
        });
    }

    async function carregarHorariosRota() {
        const idRota = obterIdRotaDaUrl();
        if (idRota) {
            try {
                const resultado = await routeService.listarHorariosPorRota(idRota);
                if (resultado.success && resultado.data) {
                    agruparParadasPorHorario(resultado.data);
                } else {
                    console.error('Erro ao carregar os horários:', resultado.message);
                }
            } catch (erro) {
                console.error('Erro ao buscar horários da rota:', erro);
            }
        } else {
            console.error('ID da rota não encontrado na URL');
        }
    }

    // Função para filtrar horários e paradas com base na pesquisa
    function filtrarHorariosEPardas() {
        const searchTerm = searchInput.value.toLowerCase(); // Obtém o termo da busca
        const containerHorarios = document.querySelector('.mt-2.space-y-4');
        const cards = containerHorarios.querySelectorAll('div.border-t');

        cards.forEach(card => {
            const paradasText = card.querySelector('p').textContent.toLowerCase(); 
            const horarioText = card.querySelector('span.text-blue-600').textContent.toLowerCase(); 

            if (paradasText.includes(searchTerm) || horarioText.includes(searchTerm)) {
                card.style.display = ''; // Exibe o card se o termo for encontrado
            } else {
                card.style.display = 'none'; // Esconde o card se o termo não for encontrado
            }
        });
    }

    // Adiciona o evento de pesquisa
    searchInput.addEventListener('input', filtrarHorariosEPardas);

    carregarHorariosRota();
});
