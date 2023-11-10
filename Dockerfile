# Imagem base
FROM node:16

# Diretório de trabalho
WORKDIR /app

# Copie package.json e package-lock.json para o diretório de trabalho
COPY package.json ./
COPY package-lock.json ./

# Instale as dependências do projeto e o pm2 globalmente
RUN npm install --only=production && npm install -g pm2

# Copie o código do aplicativo
COPY . .

# Exponha a porta em que o aplicativo será executado
EXPOSE 2800

# Definir variáveis de ambiente para produção
ENV NODE_ENV=production
ENV TZ=America/Sao_Paulo

# Executar a aplicação em produção
CMD ["pm2-runtime", "start", "processes.json", "--env", "production"]
