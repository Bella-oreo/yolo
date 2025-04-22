# 🐳 YOLO E-commerce Platform - Containerized with Docker

> This project containerizes a full-stack e-commerce application using Docker and Docker Compose. It includes a frontend, backend (Node.js + Express), and a MongoDB database, all orchestrated through Docker Compose.

---

## 📦 Project Structure


yoloproject/ │ ├── backend/ # Node.js Express backend ├── frontend/ # React frontend ├── mongo/ # MongoDB Docker volume ├── Dockerfile (backend) # Inside /backend ├── Dockerfile (frontend)# Inside /frontend ├── docker-compose.yml ├── README.md ├── explanation.md └── screenshotsdockerhub/ ├── frontendv2.png └── backendv2.png


---

## 🔧 Requirements

- Docker installed: [Get Docker](https://docs.docker.com/get-docker/)
- Docker Compose installed (included with Docker Desktop)
- Git (for cloning the repository)

---

## 🚀 Setup & Run the App

### Clone the Repository

```bash
git clone https://github.com/Bella-oreo/yoloproject.git 
cd yoloproject

### Build and Start the Containers

docker-compose up --build


###Access the App

Frontend: http://localhost:3000

Backend-API: http://localhost:5000


#DockerHub Images
Frontend: bellandirangu/frontend:v2

Backend: bellandirangu/backend:v2

#DockerHub screenshots
Located in /screenshotsdockerhub:

frontendv2.png

backendv2.png

#Add Product(Feature Demo)
You can add a new product by clicking the “Add Product” button on the homepage. This tests the MongoDB integration and ensures data persistence across container restarts.


#Docker Compose Configuration
Uses a custom bridge network for seamless communication between services

MongoDB data persists through volumes

Ports:

Frontend → 3000:3000

Backend → 5000:5000

MongoDB → 27017:27017

#Versioning & Tagging
docker build -t bellandirangu/frontend:v2 .
docker build -t bellandirangu/backend:v2 .
docker push bellandirangu/frontend:v2
docker push bellandirangu/backend:v2

#Git Workflow
Forked the base repo

Created meaningful commits for each step

Documented changes

Followed folder structure conventions

Total commits: 10+ with clear descriptions


#License
This project is part of the Docker containerization independent project and is for educational use.

Built by Bella Naswa Ndirangu

---

