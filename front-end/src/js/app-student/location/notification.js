import notificacaoService from '../../../../services/notificationService.js';

function obterDataHoraAtual() {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace("T", " ");
}

async function obterNotificacoesAtivas() {
    const dataHoraAtual = obterDataHoraAtual();

    try {
        const resposta = await notificacaoService.listarNotificacoesAtivas(dataHoraAtual);

        if (resposta.success) {
            const notificacoesAtivas = resposta.data;
            console.log('notificacoes', notificacoesAtivas);
            const notificationBadge = document.querySelector('.notification-badge');
            
            if (notificacoesAtivas.length > 0) {
                notificationBadge.textContent = notificacoesAtivas.length;
                notificationBadge.style.display = 'flex';
                
                notificacoesAtivas.forEach((notificacao) => {
                    exibirNotificacao(notificacao.mensagem, notificacao.titulo);
                });
            } else {
                notificationBadge.style.display = 'none';
            }
        } else {
            console.error("Erro ao buscar notificações:", resposta.message);
        }
    } catch (erro) {
        console.error("Erro ao chamar o serviço de notificações:", erro);
    }
}

// Função para criar e exibir a notificação na tela
function exibirNotificacao(mensagem, titulo) {
    const container = document.getElementById('notification-container');
    
    const notification = document.createElement('div');
    notification.classList.add('notification');

    notification.innerHTML = `
        <div class="flex flex-col bg-white border border-gray-300 shadow-lg p-3 rounded-lg w-80">
            <div class="flex items-center border-b pb-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v4a2 2 0 01-2 2h16a2 2 0 01-2-2V8a6 6 0 00-6-6zm-1 12h2v2h-2v-2z" />
                </svg>
                <span class="text-gray-900 font-semibold ml-2">${titulo}</span>
                <button class="ml-auto text-gray-500 hover:text-gray-700 notification-close">&times;</button>
            </div>
            <span class="text-gray-800">${mensagem}</span>
        </div>
    `;

    // Adiciona evento para fechar a notificação
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    container.appendChild(notification);

    // Remove a notificação automaticamente após 4 segundos
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Evento de clique no ícone de notificação
document.querySelector('.notification-icon').addEventListener('click', () => {
    obterNotificacoesAtivas();
});

// Chama a função para obter notificações ao carregar
obterNotificacoesAtivas();
