const socket = io('https://192.168.0.108:3000', {
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

  socket.emit('enviar-dados-motorista', dadosMotorista);
}

function receberDadosMotorista(callback) {
  socket.on('atualizar-localizacao', (dadosMotorista) => {
    if (callback && typeof callback === 'function') {
      callback(dadosMotorista);  
    }
  });
}

// Função para desconectar do WebSocket
function desconectar() {
  socket.disconnect();
}

export { enviarDadosMotorista, receberDadosMotorista, desconectar };
