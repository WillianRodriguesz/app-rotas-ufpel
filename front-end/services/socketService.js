
const socket = io('https://localhost:3000', {
  secure: true, // Usar HTTPS
  rejectUnauthorized: false, // Ignorar erros de certificado SSL no ambiente local
});

// Função para enviar os dados do motorista para o servidor via WebSocket
function enviarDadosMotorista(id, rota, localizacao, mensagem) {
  const dadosMotorista = {
    id, 
    localizacao,
    mensagem, 
    rota, 
  };

  // Enviar os dados para o servidor
  socket.emit('enviar-dados-motorista', dadosMotorista);
}

// Função para receber os dados do motorista (quando o servidor envia uma atualização)
function receberDadosMotorista() {
  socket.on('atualizar-localizacao', (dadosMotorista) => {
    console.log('Nova localização do motorista:', dadosMotorista);
    // Aqui você pode atualizar a interface ou exibir a localização do motorista no mapa
  });
}

// Função para desconectar do WebSocket
function desconectar() {
  socket.disconnect();
}

export { enviarDadosMotorista, receberDadosMotorista, desconectar };
