# 🐳 YOLO E-commerce Platform - Full-Stack Containerized & Kubernetes-Orchestrated

> A robust e-commerce application featuring a React frontend, Node.js + Express backend, and MongoDB. Fully containerized with Docker and Docker Compose, automated with Ansible, and orchestrated on Google Kubernetes Engine (GKE) using Kubernetes best practices.

---

## 📁 Repository Structure

```
yoloproject/
├── backend/                   # Node.js + Express backend
│   └── Dockerfile             # Backend container configuration
├── frontend/                  # React frontend application
│   └── Dockerfile             # Frontend container configuration
├── kubernetesFolder/          # Kubernetes manifests for GKE
│   ├── mongo-statefulset.yaml  # StatefulSet + PVC for MongoDB
│   ├── mongo-service.yaml      # Headless Service for MongoDB
│   ├── backend-deployment.yaml # Deployment for backend
│   ├── backend-service.yaml    # ClusterIP Service for backend
│   ├── frontend-deployment.yaml# Deployment for frontend
│   └── frontend-service.yaml   # LoadBalancer Service for frontend
├── docker-compose.yml         # Manual Docker orchestration
├── inventory.yml              # Ansible inventory
├── playbook.yml               # Ansible automation playbook
├── roles/                     # Ansible roles (mongo, backend, frontend, nginx)
├── explanation.md             # Detailed design & implementation rationale
└── README.md                  # Project overview & setup instructions
```

---

## 🔄 Recent Updates & Key Workflows

1. **Docker & DockerHub**

   * Multi-stage Dockerfiles for backend (`node:14` → `alpine:3.16.7`) and frontend (`node:14-slim` → `alpine:3.16.7`).
   * Images built and pushed: `bellandirangu/backend:v3`, `bellandirangu/frontend:v3`.

2. **Docker Compose**

   * Local orchestration with named volume (`app-mongo-data`) for MongoDB persistence.
   * Custom `app-net` network isolates containers.

3. **Ansible Automation**

   * Roles for each service; `ansible-playbook playbook.yml` provisions all containers reproducibly.

4. **Kubernetes on GKE**

   * **MongoDB StatefulSet** with `volumeClaimTemplates` (1Gi PVC, `standard` StorageClass).
   * **Headless Service** (`clusterIP: None`) provides stable DNS (`mongo-0.mongo-service`).
   * **Backend/Frontend Deployments**: Configured env vars for service discovery and scaled via ReplicaSets.
   * **Services**: `backend-service` (ClusterIP) internal, `frontend-service` (LoadBalancer) external.

5. **Persistence Testing**

   * Verified PVC durability by inserting test document, deleting `mongo-0`, and confirming data remained.

6. **Documentation & Git Workflow**

   * Over 10 descriptive commits covering Docker builds, Ansible integration, Kubernetes deployment, and fixes.
   * Version tags: `v1.0.0` (Docker), `v2.0.0` (Ansible), `v3.0.0` (Kubernetes).

---

## 🛠 Prerequisites

* [Docker](https://docs.docker.com/get-docker/)
* Docker Compose
* [kubectl](https://kubernetes.io/docs/tasks/tools/) configured for GKE
* [gcloud CLI](https://cloud.google.com/sdk)
* Ansible (v2.9+)
* Git

---

## 🚀 Quickstart

### 1. Clone & Navigate

```bash
git clone https://github.com/Bella-oreo/yolo
cd yoloproject
```

### 2. Local Docker Compose (Optional)

```bash
docker-compose up --build
```

Access:

* Frontend: `http://localhost:3000`
* Backend: `http://localhost:5000`

### 3. Automated Provisioning with Ansible (Optional)

```bash
ansible-playbook -i inventory.yml playbook.yml
```

### 4. Deploy to GKE

1. Configure context:

   ```bash
   ```

gcloud container clusters get-credentials \<CLUSTER\_NAME> --zone <ZONE>

````
2. Apply Kubernetes manifests:
   ```bash
kubectl apply -f kubernetesFolder/mongo-statefulset.yaml
kubectl apply -f kubernetesFolder/mongo-service.yaml
kubectl apply -f kubernetesFolder/backend-deployment.yaml
kubectl apply -f kubernetesFolder/backend-service.yaml
kubectl apply -f kubernetesFolder/frontend-deployment.yaml
kubectl apply -f kubernetesFolder/frontend-service.yaml
````

3. Verify resources:

   ```bash
   ```

kubectl get statefulsets,pods,svc

````
4. Retrieve frontend external IP:
   ```bash
kubectl get svc frontend-service
````

Access the app at `http://<EXTERNAL_IP>`.

---

## 📝 Documentation

* **Project Overview & Setup:** `README.md` (this file)
* **Implementation Rationale:** `explanation.md`

---

*Developed by Bella Naswa Ndirangu*
