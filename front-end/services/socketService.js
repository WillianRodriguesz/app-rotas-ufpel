
const socket = io('https://localhost:3000', {
  secure: true, 
  rejectUnauthorized: false, 
});

// Função para enviar os dados do motorista para o servidor via WebSocket
function enviarDadosMotorista(id, rota, horarioDaRota, acessibilidade, localizacao) {
  const dadosMotorista = {
    id, 
    localizacao,
    horarioDaRota, 
    rota,
    acessibilidade, 
  };

  // Enviar os dados para o servidor
  socket.emit('enviar-dados-motorista', dadosMotorista);
}

function receberDadosMotorista() {
  socket.on('atualizar-localizacao', (dadosMotorista) => {
    console.log('Nova localização do motorista:', dadosMotorista);
  });
}

// Função para desconectar do WebSocket
function desconectar() {
  socket.disconnect();
}

export { enviarDadosMotorista, receberDadosMotorista, desconectar };
