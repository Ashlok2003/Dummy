# Stage 1: Build the JAR file
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application with a slim JDK image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/react-backend-practice-0.1.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
