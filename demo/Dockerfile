# Use official Java 17 base image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy your JAR file into the container
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Expose port (Spring Boot default)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
