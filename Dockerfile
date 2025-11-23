# Estágio de Build
FROM node:18-alpine as build

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Estágio de Produção
FROM nginx:alpine

# Copiar os arquivos estáticos do build para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
