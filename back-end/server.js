const https = require('https');
const fs = require('fs');
const path = require('path');
const app = require('./app');
const socketIo = require('socket.io');

// Caminho absoluto para os arquivos de certificado
const options = {
  cert: fs.readFileSync(path.resolve(__dirname, '../server.cert')),  
  key: fs.readFileSync(path.resolve(__dirname, '../server.key'))  
};

const PORT = process.env.PORT || 3000;

// Criar o servidor HTTPS
const server = https.createServer(options, app);

// Criar o servidor de WebSocket (Socket.IO) associado ao servidor HTTPS
const io = socketIo(server);

// Quando um motorista ou aluno se conecta
io.on('connection', (socket) => {
  console.log('Usuário conectado: ' + socket.id);

  socket.on('enviar-dados-motorista', (dadosMotorista) => {
    console.log(`Dados do motorista ${dadosMotorista.motoristaId} recebidos:`, dadosMotorista);

    io.emit('atualizar-localizacao', dadosMotorista);  
  });

  // Quando um aluno se desconecta
  socket.on('disconnect', () => {
    console.log('Usuário desconectado: ' + socket.id);
  });
});

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`Servidor online! Porta: ${PORT}`);
});
