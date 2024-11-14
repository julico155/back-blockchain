# Usa una imagen base de Node.js
FROM node:20

# Crea un directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que tu aplicación escucha
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
