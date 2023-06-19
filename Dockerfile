# Usar una imagen base de Node.js
FROM node:16.14.0-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración y las dependencias del proyecto
COPY package.json package-lock.json /app/

# Instalar las dependencias del proyecto
RUN npm ci --quiet

# Copiar el resto de los archivos del proyecto
COPY . /app

# Construir la aplicación de Angular
RUN npm run build

# Configurar la variable de entorno para el entorno de producción
ENV NODE_ENV=production

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 4200

# Iniciar la aplicación cuando se inicie el contenedor
CMD ["npm", "start"]
