# Imagem base: Node.js
FROM node:16

# Diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos necessários para instalar dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para dentro do contêiner
COPY . .

# Exponha a porta da API (3001)
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]
