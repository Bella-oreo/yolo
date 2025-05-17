# Explanation of YOLO Project Implementation

This document details the architectural and orchestration choices made throughout the YOLO e-commerce platform development—including Docker, Ansible, and Kubernetes stages—to satisfy the Week 5 assignment requirements.

---

## 1. Docker Implementation

### 1.1 Base Images and Multi-Stage Builds

* **Backend Dockerfile**

  * **Build Stage** (`node:14`): Ensures compatibility with project dependencies and fast build times.
  * **Production Stage** (`alpine:3.16.7`): Minimizes image size and attack surface by installing only the Node.js runtime (`apk add --no-cache nodejs npm`).
* **Frontend Dockerfile**

  * **Build Stage** (`node:14-slim`): Lightweight image for React builds.
  * **Production Stage** (`alpine:3.16.7`): Hosts the static frontend assets served by a minimal HTTP server.

### 1.2 Key Directives

* `WORKDIR /usr/src/app`, `COPY package*.json`, `RUN npm install`, then `COPY . .` for reproducible builds.
* `EXPOSE 5000` (backend) and `EXPOSE 3000` (frontend).
* `CMD` to start servers (`node server.js` or `npm start`).

### 1.3 Docker Compose

* Defines three services:

  * `bellandirangu/client`: Frontend React application.
  * `bellandirangu/backend`: Node.js API.
  * `mongo`: MongoDB database.
* **Networking**: Custom bridge network (`app-net`) isolates services.
* **Volumes**: Named volume `app-mongo-data` persists database storage locally.
* **Port Mapping**: 3000→3000 (frontend), 5000→5000 (backend), 27017→27017 (MongoDB).

### 1.4 DockerHub Integration

* Images tagged and pushed: `bellandirangu/backend:v2`, `bellandirangu/frontend:v2`. Enables direct pulls in production.

---

## 2. Ansible Automation

### 2.1 Playbook and Roles

* **Inventory & Group Vars**: Centralized configuration via `inventory.yml` and `group_vars/all.yml`.
* **Roles**: Modular structure

  * `roles/backend`: Builds and deploys backend container.
  * `roles/frontend`: Builds and deploys frontend container.
  * `roles/mongo`: Sets up MongoDB service and data directory.
  * `roles/nginx`: Configures reverse proxy or static file serving as needed.

### 2.2 Repeatable Deployment

* `ansible-playbook playbook.yml` provisions all services on local Vagrant or remote hosts.
* Ensures consistent environment across developers and CI/CD pipelines.

---

## 3. Kubernetes Orchestration on GKE

### 3.1 Kubernetes Objects

* **StatefulSet (MongoDB)**

  * Uses `volumeClaimTemplates` to dynamically provision a **PersistentVolumeClaim** (PVC) of 1Gi with `standard` StorageClass.
  * **Headless Service** (`mongo-service`, `clusterIP: None`) provides stable DNS (`mongo-0.mongo-service`) for the database pod.
* **Deployments**

  * **Backend Deployment**: Single replica, connected to `mongo-0.mongo-service:27017`, configured via environment variables `MONGODB_URL` and `DB_NAME`.
  * **Frontend Deployment**: Hosts static React build, configures environment variable `REACT_APP_API_URL` to connect to `backend-service:5000`.
* **Services**

  * `backend-service` (ClusterIP): Exposes port 5000 internally for frontend.
  * `frontend-service` (LoadBalancer): Exposes port 80 externally, assigning a public IP on GKE.

### 3.2 Persistent Storage Validation

* **Test Workflow**:

  1. Insert a test record into `db.products` using a one-off Mongo client container.
  2. Delete the `mongo-0` pod (`kubectl delete pod mongo-0`).
  3. Upon restart, query `db.products.find().pretty()`—the test record persists, confirming PVC durability.

### 3.3 Service Exposure

* **Frontend**: Accessible at `http://<EXTERNAL_IP>`, where `<EXTERNAL_IP>` is the LoadBalancer address of `frontend-service`.
* **Backend**: Accessible within the cluster via `backend-service:5000` (frontend uses this).

---

## 4. Git Workflow and Versioning

* **Branching**: Single `main` branch with feature commits.
* **Commits**: Over 10 descriptive commits, including:

  * `Add multi-stage Dockerfiles`
  * `Integrate Docker Compose`
  * `Add Ansible roles for backend/frontend/mongo`
  * `Deploy MongoDB StatefulSet with PVC`
  * `Fix backend DB connection to use env vars`
  * `Update README and explanation.md`
* **Tags**: `v1.0.0` for initial Docker release, `v2.0.0` for Ansible integration, `v3.0.0` for Kubernetes deployment.

---

## 5. Best Practices Applied

* **Security**: Minimal base images (`alpine`), environment variables for secrets (configured via Kubernetes Secrets if extended).
* **Reliability**: Kubernetes liveness/readiness omitted for simplicity in class, but recommended for production.
* **Maintainability**: Clear folder structure, modular Ansible roles, and reusable Kubernetes manifests.
* **Documentation**: `README.md` for usage, `explanation.md` for implementation rationale.

*Developed by Bella Ndirangu*
