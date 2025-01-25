const https = require('https');
const fs = require('fs');
const path = require('path');
const app = require('./app');

// Caminho absoluto para os arquivos de certificado
const options = {
  cert: fs.readFileSync(path.resolve(__dirname, '../server.cert')),  
  key: fs.readFileSync(path.resolve(__dirname, '../server.key'))  
};

const PORT = process.env.PORT || 3000;

https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor online! Porta: ${PORT}`);
});
