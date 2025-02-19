import userService from '../../../../services/userService.js';

document.addEventListener("DOMContentLoaded", async () => {
    await carregarUsuarios();
    configurarEventosModais();
    configurarBuscaUsuarios();  
});

let usuarios = [];

async function carregarUsuarios() {
    const listaUsuarios = document.getElementById("lista-usuarios");
    listaUsuarios.innerHTML = "<p class='text-center'>Carregando usuários...</p>";

    const resposta = await userService.listarUsuarios();
    if (!resposta.success) {
        listaUsuarios.innerHTML = `<p class='text-center text-red-500'>Erro: ${resposta.mensagem}</p>`;
        return;
    }

    usuarios = resposta.data;
    listarUsuarios(usuarios);
}

function listarUsuarios(usuarios) {
    const listaUsuarios = document.getElementById("lista-usuarios");
    listaUsuarios.innerHTML = "";
    usuarios.forEach(usuario => listaUsuarios.appendChild(criarCardUsuario(usuario)));
}

function criarCardUsuario(usuario) {
    const div = document.createElement("div");
    div.className = "bg-white p-4 shadow-md rounded-lg flex justify-between items-center";
    
    div.innerHTML = `
        <div class="flex items-center space-x-4">
            ${usuario.motorista ? '<i class="fa-solid fa-bus text-xl text-blue-600"></i>' : '<i class="fa-solid fa-user-shield text-xl text-green-600"></i>'}
            <div>
                <p class="font-semibold">${usuario.nome}</p>
                <p class="text-sm text-gray-500">${usuario.email}</p>
            </div>
        </div>
        <div class="flex space-x-3">
            <button class="text-yellow-500 hover:text-yellow-700 p-2 btn-editar" data-id="${usuario.id_usuario}" data-email="${usuario.email}">
                <i class="fa-solid fa-pen text-xl"></i>
            </button>
            <button class="text-red-500 hover:text-red-700 p-2 btn-excluir" data-id="${usuario.id_usuario}" data-nome="${usuario.nome}">
                <i class="fa-solid fa-trash text-xl"></i>
            </button>
        </div>
    `;

    div.querySelector(".btn-editar").addEventListener("click", () => abrirModalEditarUsuario(usuario.id_usuario, usuario.email));
    div.querySelector(".btn-excluir").addEventListener("click", () => excluirUsuario(usuario.id_usuario, usuario.nome));

    return div;
}

async function excluirUsuario(id, nome) {
    const resultado = await Swal.fire({
        title: `Tem certeza que deseja excluir o usuário ${nome}?`,
        text: "Essa ação não pode ser desfeita.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
        const resultadoExclusao = await userService.excluirUsuario(id);
        if (resultadoExclusao.success) {
            Swal.fire('Excluído!', `O usuário ${nome} foi excluído com sucesso.`, 'success');
            carregarUsuarios(); 
        } else {
            Swal.fire('Erro!', `Erro ao excluir o usuário ${nome}: ${resultadoExclusao.message}`, 'error');
        }
    }
}

function configurarEventosModais() {
    const addUsuarioModal = document.getElementById("add-usuario-modal");
    const modalAdicionar = document.getElementById("modal-adicionar");
    const btnCancelarAdicionar = document.getElementById("btn-cancelar-adicionar");
    const btnCancelarEditar = document.getElementById("btn-cancelar-editar"); 
    const modalEditar = document.getElementById("modal-editar");

    if (addUsuarioModal && modalAdicionar) {
        addUsuarioModal.addEventListener("click", () => {
            modalAdicionar.classList.remove("hidden");
            configurarAdicionarUsuario(); 
        });
        btnCancelarAdicionar.addEventListener("click", () => modalAdicionar.classList.add("hidden"));
    }

    if (btnCancelarEditar && modalEditar) {
        btnCancelarEditar.addEventListener("click", () => modalEditar.classList.add("hidden"));
    }
}

function configurarAdicionarUsuario() {
    const formAdicionar = document.getElementById("form-adicionar-usuario");
    const nomeElement = document.getElementById("nome");
    const emailElement = document.getElementById("email");
    const tipoElement = document.getElementById("tipo");

    if (nomeElement) nomeElement.value = '';
    if (emailElement) emailElement.value = '';
    if (tipoElement) tipoElement.value = '';

    if (formAdicionar) {
        formAdicionar.onsubmit = adicionarUsuario;
    }
}

function configurarBuscaUsuarios() {
    document.getElementById("search").addEventListener("input", (event) => {
        const termoBusca = event.target.value.toLowerCase();
        const usuariosFiltrados = usuarios.filter(usuario => 
            usuario.nome.toLowerCase().includes(termoBusca) || usuario.email.toLowerCase().includes(termoBusca)
        );
        listarUsuarios(usuariosFiltrados); 
    });
}

async function adicionarUsuario(event) {
    event.preventDefault();

    const nomeElement = document.getElementById("nome"); 
    const emailElement = document.getElementById("email");
    const tipoElement = document.getElementById("tipo");

    if (!nomeElement || !emailElement || !tipoElement) {
        console.error("Erro: Um ou mais campos não foram encontrados no DOM.");
        return;
    }

    const nome = nomeElement.value;
    const email = emailElement.value;
    const motorista = tipoElement.value === "motorista";
    const senha = '123';

    const resultado = await userService.criarUsuario({ nome, email, senha, motorista });

    if (resultado.success) {
        Swal.fire('Adicionado!', `O usuário ${nome} foi adicionado com sucesso.`, 'success');
        carregarUsuarios();
        fecharModalAdicionar();
    } else {
        Swal.fire('Erro!', `Erro ao adicionar o usuário ${nome}: ${resultado.message}`, 'error');
    }
}

function fecharModalAdicionar() {
    const modalAdicionar = document.getElementById("modal-adicionar");
    modalAdicionar.classList.add("hidden");
}

function abrirModalEditarUsuario(id_usuario, email) {
    const modal = document.getElementById("modal-editar");
    userService.obterUsuarioPorEmail(email).then(usuario => {
        document.getElementById("nome-editar").value = usuario.data.nome;
        document.getElementById("email-editar").value = usuario.data.email;
        document.getElementById("tipo-editar").value = usuario.data.motorista ? "motorista" : "administrador";
        modal.classList.remove("hidden");
        document.getElementById("form-editar-usuario").onsubmit = (event) => editarUsuario(event, id_usuario);
    }).catch(error => console.error("Erro ao carregar os dados do usuário:", error));
}

async function editarUsuario(event, id_usuario) {
    event.preventDefault();
    const nome = document.getElementById("nome-editar").value;
    const email = document.getElementById("email-editar").value;
    const motorista = document.getElementById("tipo-editar").value === "motorista";

    const resultado = await userService.atualizarUsuario(id_usuario, { nome, email, motorista });
    if (resultado.success) {
        Swal.fire('Atualizado!', `O usuário ${nome} foi atualizado com sucesso.`, 'success');
        carregarUsuarios();
        fecharModalEditar();
    } else {
        Swal.fire('Erro!', `Erro ao atualizar o usuário ${nome}: ${resultado.message}`, 'error');
    }
}

function fecharModalEditar() {
    document.getElementById("modal-editar").classList.add("hidden");
}
