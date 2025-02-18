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
        ? '<i class="fa-solid fa-user-shield text-xl text-green-600"></i>'
        : '<i class="fa-solid fa-bus text-xl text-blue-600"></i>';

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
            <button class="text-red-500 hover:text-red-700 p-2">
                <i class="fa-solid fa-trash text-xl"></i>
            </button>
        </div>
    `;

    return div;
}
