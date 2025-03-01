import paradaService from '../../../../services/stopService.js';

document.addEventListener('DOMContentLoaded', async () => {
    await carregarParadas();
    configurarEventosModais();
    configurarBuscaParadas();
});

let paradas = [];

async function carregarParadas() {
    const listaParadas = document.getElementById('lista-paradas');
    listaParadas.innerHTML = "<p class='text-center'>Carregando paradas...</p>";

    const resposta = await paradaService.listarParadas();
    console.log('data paradas:', resposta);
    if (!resposta.success) {
        listaParadas.innerHTML = `<p class='text-center text-red-500'>Erro: ${resposta.mensagem}</p>`;
        return;
    }

    paradas = resposta.data;
    listarParadas(paradas);
}

function listarParadas(paradas) {
    const listaParadas = document.getElementById('lista-paradas');
    listaParadas.innerHTML = '';
    paradas.forEach(parada => listaParadas.appendChild(criarCardParada(parada)));
}

function criarCardParada(parada) {
    const div = document.createElement('div');
    div.className = 'bg-white p-4 shadow-md rounded-lg flex justify-between items-center';

    div.innerHTML = `
        <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
                <i class="fa-solid fa-location-dot text-blue-500"></i> 
                <p class="font-semibold">${parada.nome}</p>
            </div>
        </div>
        <div class="flex space-x-3">
            <button class="text-yellow-500 hover:text-yellow-700 p-2 btn-editar" data-id="${parada.id}">
                <i class="fa-solid fa-pen text-xl"></i>
            </button>
            <button class="text-red-500 hover:text-red-700 p-2 btn-excluir" data-id="${parada.id}" data-nome="${parada.nome}">
                <i class="fa-solid fa-trash text-xl"></i>
            </button>
        </div>
        `;

    div.querySelector('.btn-editar').addEventListener('click', () => abrirModalEditarParada(parada.id));
    div.querySelector('.btn-excluir').addEventListener('click', () => excluirParada(parada.id, parada.nome));

    return div;
}

async function excluirParada(id, nome) {
    const resultado = await Swal.fire({
        title: `Tem certeza que deseja excluir a parada ${nome}?`,
        text: 'Essa ação não pode ser desfeita.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
        const resultadoExclusao = await paradaService.excluirParada(id);
        if (resultadoExclusao.success) {
            Swal.fire('Excluída!', `A parada ${nome} foi excluída com sucesso.`, 'success');
            carregarParadas();
        } else {
            Swal.fire('Erro!', `Erro ao excluir a parada ${nome}: ${resultadoExclusao.message}`, 'error');
        }
    }
}

function configurarEventosModais() {
    const addParadaModal = document.getElementById('add-parada-modal');
    const modalAdicionar = document.getElementById('modal-adicionar');
    const btnCancelarAdicionar = document.getElementById('btn-cancelar-adicionar');
    const btnCancelarEditar = document.getElementById('btn-cancelar-editar'); 
    const modalEditar = document.getElementById('modal-editar');

    if (addParadaModal && modalAdicionar) {
        addParadaModal.addEventListener('click', () => {
            modalAdicionar.classList.remove('hidden');
            configurarAdicionarParada();
        });
        btnCancelarAdicionar.addEventListener('click', () => modalAdicionar.classList.add('hidden'));
    }

    if (btnCancelarEditar && modalEditar) {
        btnCancelarEditar.addEventListener('click', () => modalEditar.classList.add('hidden'));
    }
}

function configurarAdicionarParada() {
    const formAdicionar = document.getElementById('form-adicionar-parada');
    const nomeElement = document.getElementById('nome');
    const latitudeElement = document.getElementById('latitude');
    const longitudeElement = document.getElementById('longitude');

    if (nomeElement) nomeElement.value = '';
    if (latitudeElement) latitudeElement.value = '';
    if (longitudeElement) longitudeElement.value = '';

    if (formAdicionar) {
        formAdicionar.onsubmit = adicionarParada;
    }
}

function configurarBuscaParadas() {
    document.getElementById('search').addEventListener('input', (event) => {
        const termoBusca = event.target.value.toLowerCase();
        const paradasFiltradas = paradas.filter(parada => 
            parada.nome.toLowerCase().includes(termoBusca));
        listarParadas(paradasFiltradas);
    });
}

async function adicionarParada(event) {
    event.preventDefault();

    const nomeElement = document.getElementById('nome');
    const latitudeElement = document.getElementById('latitude');
    const longitudeElement = document.getElementById('longitude');

    if (!nomeElement || !latitudeElement || !longitudeElement) {
        console.error('Erro: Um ou mais campos não foram encontrados no DOM.');
        return;
    }

    const nome = nomeElement.value;
    const latitude = latitudeElement.value;
    const longitude = longitudeElement.value;

    Swal.fire({
        title: 'Registrando parada...',
        text: 'Aguarde um momento',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    const resultado = await paradaService.criarParada({ nome, latitude, longitude });

    if (resultado.success) {
        Swal.fire({
            icon: 'success',
            title: 'Parada criada!',
            text: `A parada ${nome} foi adicionada com sucesso.`,
        });
        carregarParadas();
        fecharModalAdicionar();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: `Erro ao adicionar a parada ${nome}: ${resultado.message}`,
        });
    }
}

function fecharModalAdicionar() {
    const modalAdicionar = document.getElementById('modal-adicionar');
    modalAdicionar.classList.add('hidden');
}

function abrirModalEditarParada(id) {
    const modal = document.getElementById('modal-editar');
    paradaService.obterParadaPorId(id).then(parada => {
        document.getElementById('nome-editar').value = parada.data.nome;
        document.getElementById('latitude-editar').value = parada.data.latitude;
        document.getElementById('longitude-editar').value = parada.data.longitude;
        modal.classList.remove('hidden');
        document.getElementById('form-editar-parada').onsubmit = (event) => editarParada(event, id);
    }).catch(error => console.error('Erro ao carregar os dados da parada:', error));
}

async function editarParada(event, id) {
    event.preventDefault();
    const nome = document.getElementById('nome-editar').value;
    const latitude = document.getElementById('latitude-editar').value;
    const longitude = document.getElementById('longitude-editar').value;

    const resultado = await paradaService.atualizarParada(id, { nome, latitude, longitude });
    if (resultado.success) {
        Swal.fire('Atualizada!', `A parada ${nome} foi atualizada com sucesso.`, 'success');
        carregarParadas();
        fecharModalEditar();
    } else {
        Swal.fire('Erro!', `Erro ao atualizar a parada ${nome}: ${resultado.message}`, 'error');
    }
}

function fecharModalEditar() {
    document.getElementById('modal-editar').classList.add('hidden');
}
