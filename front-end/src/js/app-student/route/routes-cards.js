import routeService from '../../../../services/routeService.js';

async function carregarRotas() {
    try {
        const resultado = await routeService.listarRotas();
        const rotas = resultado.data; 
        
        if (Array.isArray(rotas)) {
            const container = document.querySelector("main");
            container.innerHTML = "";

            rotas.forEach(rota => {
                const card = document.createElement("div");
                card.className = "bg-white shadow-md rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-lg";
                card.dataset.id = rota.id; 

                card.innerHTML = `
                    <div>
                        <h2 class="text-md font-bold text-gray-800">${rota.nome}</h2>
                        <p class="text-sm text-gray-600">Ver detalhes de horários e paradas</p>
                    </div>
                    <i class="fa-solid fa-arrow-right text-blue-500 text-xl"></i>
                `;

                card.addEventListener("click", () => {
                    window.location.href = `/rotas/detalhes?id=${rota.id}`;
                });

                container.appendChild(card);
            });

            const searchInput = document.querySelector('input[type="text"]');
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const cards = container.querySelectorAll('.bg-white');

                cards.forEach(card => {
                    const nomeRota = card.querySelector('h2').textContent.toLowerCase();
                    if (nomeRota.includes(searchTerm)) {
                        card.style.display = ''; 
                    } else {
                        card.style.display = 'none'; 
                    }
                });
            });

        } else {
            console.error("O retorno 'data' não é um array:", rotas);
        }

    } catch (error) {
        console.error("Erro ao carregar as rotas:", error);
    }
}

document.addEventListener("DOMContentLoaded", carregarRotas);
