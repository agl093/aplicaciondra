# Usar una imagen base de Java para el backend de Spring
FROM openjdk:16-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo JAR de tu aplicación Spring al contenedor
COPY target/back.jar /app/back.jar

# Exponer el puerto en el que se ejecuta tu aplicación Spring (puerto 8080 en este ejemplo)
EXPOSE 8080

# Configurar la variable de entorno para la conexión a la base de datos PostgreSQL
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://database_host:5432/postgresql_database
ENV SPRING_DATASOURCE_USERNAME=user
ENV SPRING_DATASOURCE_PASSWORD=pass

# Iniciar la aplicación Spring cuando se inicie el contenedor
CMD ["java", "-jar", "/app/your-app.jar"]
