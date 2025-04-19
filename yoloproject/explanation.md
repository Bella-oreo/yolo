# Explanation of Docker Implemntation for YOLO E-commerce App

## 1. Choice of Base Image

For the backend container, I used the official `node:14` image as the base for the build stage. This image includes Node.js and npm, which are required to install and run the backend application. It ensures compatibility with our project dependencies.

For the final production container, I used `alpine:3.16.7`, a lightweight Linux distribution. It reduces the overall image size, leading to faster builds and more secure deployments. This multi-stage approach ensures we only ship the essential files into production.


## 2. Dockerfile Directives

The Dockerfile is built in two stages:


- **Build Stage**
  - `FROM node:14 AS build`: Uses Node.js 14 for compatibility.
  - `WORKDIR /usr/src/app`: Sets the working directory in the container.
  - `COPY package*.json ./`: Copies the package files to install dependencies.
  - `RUN npm install`: Installs all dependencies.
  - `COPY . .`: Copies the rest of the backend source code.

- **Production Stage**
  - `FROM alpine:3.16.7`: Starts a clean, small production environment.
  - `WORKDIR /app`: New working directory.
  - `RUN apk add --no-cache nodejs npm`: Installs Node and npm.
  - `COPY --from=build /usr/src/app /app`: Pulls built files from the previous stage.
  - `EXPOSE 5000`: Exposes the backend port.
  - `CMD ["node", "server.js"]`: Starts the backend server.

This setup minimizes final image size and improves security.

## 3. Docker Compose Networking

The `docker-compose.yml` file defines services like the backend and MongoDB, each running in its own container. Docker Compose automatically creates a **bridge network** between these services. This enables internal communication using service names (e.g., the backend can access MongoDB at `mongo:27017`).

Ports are exposed to the host machine as needed:
```yaml
ports:
  - "5000:5000"

