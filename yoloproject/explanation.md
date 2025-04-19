# Explanation of Docker Implementation for YOLO E-commerce App

## 1. Choice of Base Images

### Backend
- **Build Stage:** Uses `node:14` because it is stable and compatible with the backend dependencies.
- **Production Stage:** Uses `alpine:3.16.7`, a minimal and secure Linux distribution. This reduces image size and attack surface.

### Frontend
- Similar multi-stage approach using `node:14-slim` in the build stage and `alpine:3.16.7` for production. This setup ensures smaller image size and faster deployments.

---

## 2. Dockerfile Directives

Each service has a multi-stage Dockerfile with the following structure:

### Build Stage
- `FROM node:14` or `node:14-slim`: Ensures dependency compatibility.
- `WORKDIR /usr/src/app`: Sets working directory.
- `COPY package*.json ./` and `RUN npm install`: Installs only the necessary dependencies.
- `COPY . .`: Adds the full source code for build.

### Production Stage
- `FROM alpine:3.16.7`: Starts clean environment.
- `RUN apk add --no-cache nodejs npm`: Adds Node.js only for runtime.
- `COPY --from=build`: Brings in the fully built app.
- `EXPOSE`: Opens relevant ports (`3000` for frontend, `5000` for backend).
- `CMD`: Starts the server with `node server.js` or `npm start`.

---

## 3. Docker Compose Setup

`docker-compose.yml` orchestrates the application as three services:

- `brian-yolo-client`: Frontend React app
- `brian-yolo-backend`: Node.js backend service
- `app-ip-mongo`: MongoDB service

### Key Features
- **Networking:** Uses a custom bridge network (`app-net`) for isolated, internal communication.
- **Volumes:** MongoDB data is persisted using named volumes (`app-mongo-data`).
- **Ports:** Services are exposed via:
  - Frontend: `localhost:3000`
  - Backend: `localhost:5000`
  - MongoDB: `localhost:27017`

---

## 4. DockerHub Integration

The Docker images were built locally and pushed to DockerHub:

- `bellandirangu/backend:v1`
- `bellandirangu/frontend:v1`

This allows anyone to deploy without cloning the full repo by pulling these images and using the `docker-compose.yml`.

---

## 5. Git Workflow and Tags

The GitHub repository:
- Includes all relevant files: Dockerfiles, `docker-compose.yml`, and this explanation.
- Uses meaningful commit messages and a tagged release (`v1.0.0`) for versioning.
- All changes were committed and pushed after building and verifying Docker images.

---

## 6. Best Practices

- Used multi-stage builds for smaller, secure images.
- Only essential files copied to production containers.
- Network isolation with a custom Docker bridge.
- Clear port mapping for local development.
- Persistent storage for database using Docker volumes.
- Docker Compose for simplified orchestration and reproducibility.

---

## 7. How to Run

```bash
# Clone the repo
git clone <your-repo-url>
cd yoloproject

# Start all services
docker-compose up --build

