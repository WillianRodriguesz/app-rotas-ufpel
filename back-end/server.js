const http = require('http');
const app = require('./app');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Usuário conectado: ' + socket.id);

  socket.on('enviar-dados-motorista', (dadosMotorista) => {
    console.log(`Dados do motorista ${dadosMotorista.id} recebidos:`, dadosMotorista);
    io.emit('atualizar-localizacao', dadosMotorista);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado: ' + socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor online! Porta: ${PORT}`);
});
