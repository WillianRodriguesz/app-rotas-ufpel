let socket;

function obterServerUrl() {
  return fetch('/config')
    .then(response => response.json())
    .then(data => data.serverUrl)
    .catch(error => {
      console.error('Erro ao obter a URL do servidor:', error);
      return 'https://localhost:3000'; 
    });
}

obterServerUrl().then(serverUrl => {
  socket = io(serverUrl, {
    secure: true,
    rejectUnauthorized: false,
  });

  console.log(`Conectado ao servidor: ${serverUrl}`);
}).catch(error => {
  console.error('Erro ao inicializar o socket:', error);
});

function enviarDadosMotorista(id, rota, horarioDaRota, acessibilidade, localizacao) {
  if (!socket) {
    console.error("Socket não inicializado");
    return;
  }

  const dadosMotorista = {
    id, 
    localizacao,
    horarioDaRota, 
    rota,
    acessibilidade, 
  };

  socket.emit('enviar-dados-motorista', dadosMotorista);
}

function receberDadosMotorista(callback) {
  if (!socket) {
    console.error("Socket não inicializado");
    return;
  }

  socket.on('atualizar-localizacao', (dadosMotorista) => {
    if (callback && typeof callback === 'function') {
      callback(dadosMotorista);
    }
  });
}

function desconectar() {
  if (socket) {
    socket.disconnect();
  }
}

export { enviarDadosMotorista, receberDadosMotorista, desconectar };
