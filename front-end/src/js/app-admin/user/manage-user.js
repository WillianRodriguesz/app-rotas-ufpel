import userService from '../../../../services/userService.js';

document.addEventListener("DOMContentLoaded", async () => {
    await carregarUsuarios();
});

let usuarios = [];

async function carregarUsuarios() {
    const listaUsuarios = document.getElementById("lista-usuarios");
    listaUsuarios.innerHTML = "<p class='text-center'>Carregando usuários...</p>";

    const resposta = await userService.listarUsuarios();
    console.log('lista de usuarios:', resposta);
    if (!resposta.success) {
        listaUsuarios.innerHTML = `<p class='text-center text-red-500'>Erro: ${resposta.mensagem}</p>`;
        return;
    }

    usuarios = resposta.data; // Armazenando os usuários para uso na busca
    listarUsuarios(usuarios);
}

function listarUsuarios(usuarios) {
    const listaUsuarios = document.getElementById("lista-usuarios");
    listaUsuarios.innerHTML = ""; // Limpar a lista antes de preencher

    usuarios.forEach(usuario => {
        listaUsuarios.appendChild(criarCardUsuario(usuario));
    });
}

function criarCardUsuario(usuario) {
    const div = document.createElement("div");
    div.className = "bg-white p-4 shadow-md rounded-lg flex justify-between items-center";

    const icone = usuario.motorista
        ? '<i class="fa-solid fa-bus text-xl text-blue-600"></i>'
        : '<i class="fa-solid fa-user-shield text-xl text-green-600"></i>';

    div.innerHTML = `
        <div class="flex items-center space-x-4">
            ${icone}
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

    // Adicionando o evento para editar
    div.querySelector(".btn-editar").addEventListener("click", (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        const email = event.currentTarget.getAttribute("data-email");
        abrirModal(id, email);
    });

    // Adicionando o evento para excluir
    div.querySelector(".btn-excluir").addEventListener("click", (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        const nome = event.currentTarget.getAttribute("data-nome");
        excluirUsuario(id, nome);
    });

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
            Swal.fire(
                'Excluído!',
                `O usuário ${nome} foi excluído com sucesso.`,
                'success'
            );
            carregarUsuarios(); 
        } else {
            Swal.fire(
                'Erro!',
                `Erro ao excluir o usuário ${nome}: ${resultadoExclusao.message}`,
                'error'
            );
        }
    }
}

function abrirModal(id_usuario, email) {
    const modal = document.getElementById("modal-editar");

    // Buscar o usuário pelo id
    userService.obterUsuarioPorEmail(email).then(usuario => {
        document.getElementById("nome-editar").value = usuario.data.nome;
        document.getElementById("email-editar").value = usuario.data.email;
        document.getElementById("tipo-editar").value = usuario.data.motorista ? "motorista" : "administrador";

        // Exibir o modal
        modal.classList.remove("hidden");

        // Definir o que acontece ao salvar as alterações
        document.getElementById("form-editar-usuario").onsubmit = async (event) => {
            event.preventDefault();
            await editarUsuario(id_usuario);
        };
    }).catch(error => {
        console.error("Erro ao carregar os dados do usuário:", error);
    });
}

async function editarUsuario(id_usuario) {
    const nome = document.getElementById("nome-editar").value;
    const email = document.getElementById("email-editar").value;
    const motorista = document.getElementById("tipo-editar").value === "motorista";

    const usuarioData = { nome, email, motorista };

    const resultado = await userService.atualizarUsuario(id_usuario, usuarioData);

    if (resultado.success) {
        Swal.fire(
            'Atualizado!',
            `O usuário ${nome} foi atualizado com sucesso.`,
            'success'
        );
        carregarUsuarios();
        fecharModal();
    } else {
        Swal.fire(
            'Erro!',
            `Erro ao atualizar o usuário ${nome}: ${resultado.message}`,
            'error'
        );
    }
}

function fecharModal() {
    const modal = document.getElementById("modal-editar");
    modal.classList.add("hidden");
}

document.getElementById("search").addEventListener("input", (event) => {
    const termoBusca = event.target.value.toLowerCase();

    const usuariosFiltrados = usuarios.filter(usuario => {
        return usuario.nome.toLowerCase().includes(termoBusca) || usuario.email.toLowerCase().includes(termoBusca);
    });

    listarUsuarios(usuariosFiltrados); 
});
