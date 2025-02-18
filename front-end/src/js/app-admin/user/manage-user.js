import userService from '../../../../services/userService.js';

document.addEventListener("DOMContentLoaded", async () => {
    await carregarUsuarios();
});

async function carregarUsuarios() {
    const listaUsuarios = document.getElementById("lista-usuarios");
    listaUsuarios.innerHTML = "<p class='text-center'>Carregando usuários...</p>";

    const resposta = await userService.listarUsuarios();
    console.log('lista de usuarios:', resposta);
    if (!resposta.success) {
        listaUsuarios.innerHTML = `<p class='text-center text-red-500'>Erro: ${resposta.mensagem}</p>`;
        return;
    }

    listaUsuarios.innerHTML = "";
    resposta.data.forEach(usuario => {
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
            <button class="text-yellow-500 hover:text-yellow-700 p-2">
                <i class="fa-solid fa-pen text-xl"></i>
            </button>
            <button class="text-red-500 hover:text-red-700 p-2 btn-excluir" data-id="${usuario.id_usuario}" data-nome="${usuario.nome}">
                <i class="fa-solid fa-trash text-xl"></i>
            </button>
        </div>
    `;

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
