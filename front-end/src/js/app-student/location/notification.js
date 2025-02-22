import notificacaoService from '../../../../services/notificationService.js';

function obterDataHoraAtual() {
    const now = new Date();
    const ano = now.getFullYear();
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const dia = String(now.getDate()).padStart(2, '0');
    const hora = String(now.getHours()).padStart(2, '0');
    const minuto = String(now.getMinutes()).padStart(2, '0');
    const segundo = String(now.getSeconds()).padStart(2, '0');
    const milissegundo = String(now.getMilliseconds()).padStart(3, '0');

    return `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}.${milissegundo}`;
}

async function obterNotificacoesAtivas() {
    const dataHoraAtual = obterDataHoraAtual();

    try {
        const resposta = await notificacaoService.listarNotificacoesAtivas(dataHoraAtual);

        if (resposta.success) {
            const notificacoesAtivas = resposta.data;
            const numeroNotificacoes = notificacoesAtivas.length;

            const notificationIcon = document.querySelector('.notification-icon');
            const notificationBadge = document.querySelector('.notification-badge');
            
            if (numeroNotificacoes > 0) {
                notificationBadge.textContent = numeroNotificacoes;
                notificationBadge.style.display = 'flex';

                notificationIcon.classList.add('hover:scale-110');
                notificationBadge.style.animation = 'blink 1s infinite';
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

obterNotificacoesAtivas();
