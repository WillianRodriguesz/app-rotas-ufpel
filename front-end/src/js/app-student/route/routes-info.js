import routeService from '../../../../services/routeService.js';

document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('searchInput');

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

        // Criar um único card
        const cardHorario = document.createElement('div');
        cardHorario.classList.add('border-t', 'pt-4');
        
        // Criar a div para os horários com ícone de relógio único
        const divHorarios = document.createElement('div');
        divHorarios.classList.add('flex', 'items-center', 'gap-2', 'mb-2');

        const iconRelogio = document.createElement('i');
        iconRelogio.classList.add('fas', 'fa-clock', 'text-blue-600', 'text-lg');
        divHorarios.appendChild(iconRelogio);

        const horariosContainer = document.createElement('div');
        horariosContainer.classList.add('flex', 'flex-wrap', 'gap-2');
        
        Object.keys(horariosAgrupados).forEach((horario) => {
            const spanHora = document.createElement('span');
            spanHora.classList.add('text-blue-600', 'font-bold', 'text-lg', 'px-2', 'py-1', 'bg-gray-100', 'rounded-md', 'shadow-md');
            spanHora.textContent = horario.substring(0, 5);
            horariosContainer.appendChild(spanHora);
        });

        divHorarios.appendChild(horariosContainer);

        // Criar a div para as paradas
        const paragrafoParadas = document.createElement('p');
        paragrafoParadas.classList.add('text-md', 'text-gray-600', 'mt-2', 'pt-4');
        const listaParadas = Object.values(horariosAgrupados)[0]
            .sort((a, b) => a.ordem - b.ordem)
            .map(parada => parada.parada_nome).join(' → ');
        paragrafoParadas.innerHTML = `<span class="font-bold">Paradas:</span> ${listaParadas}`;

        // Montar o card
        cardHorario.append(divHorarios, paragrafoParadas);
        containerHorarios.append(cardHorario);
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

    function filtrarHorariosEPardas() {
        const searchTerm = searchInput.value.toLowerCase();
        const containerHorarios = document.querySelector('.mt-2.space-y-4');
        const card = containerHorarios.querySelector('div.border-t');

        if (card) {
            const paradasText = card.querySelector('p').textContent.toLowerCase();
            const horariosText = Array.from(card.querySelectorAll('span')).map(span => span.textContent.toLowerCase()).join(' ');
            
            if (paradasText.includes(searchTerm) || horariosText.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        }
    }

    searchInput.addEventListener('input', filtrarHorariosEPardas);

    carregarHorariosRota();
});