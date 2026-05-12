# Etapa 1: Construcción
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servidor Nginx
FROM nginx:alpine
# En Angular 18+ con el nuevo builder, la ruta es dist/[project-name]/browser
COPY --from=builder /app/dist/LandingPage/browser /usr/share/nginx/html

# Copiamos la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80
EXPOSE 80

# Ejecutamos Nginx
CMD ["nginx", "-g", "daemon off;"]