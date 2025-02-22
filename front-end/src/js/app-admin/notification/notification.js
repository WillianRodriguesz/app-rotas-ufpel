import notificacaoService from '../../../../services/notificationService.js';

document.getElementById('notificationForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const titulo = document.getElementById('titulo').value;
    const mensagem = document.getElementById('mensagem').value;
    const dataEnvio = document.getElementById('dataEnvio').value;
    const horaEnvio = document.getElementById('horaEnvio').value;
    const duracao = document.getElementById('duracao').value;

    if (!titulo || !mensagem || !dataEnvio || !horaEnvio || !duracao) {
        Swal.fire({
            icon: 'error',
            title: 'Preencha todos os campos',
            text: 'Por favor, preencha todos os campos para enviar a notificação.',
        });
        return;
    }

    const dataHoraEnvio = `${dataEnvio}T${horaEnvio}:00`;

    const response = await notificacaoService.criarNotificacao(titulo, mensagem, dataHoraEnvio, duracao);

    if (response.success) {
        Swal.fire({
            icon: 'success',
            title: 'Notificação enviada',
            text: 'Sua notificação foi enviada com sucesso!',
        });

        document.getElementById('notificationForm').reset();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Erro ao enviar notificação',
            text: response.message || 'Erro inesperado. Tente novamente mais tarde.',
        });
    }
});
