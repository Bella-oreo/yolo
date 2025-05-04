# Yolo Project - Stage 2: Ansible & Terraform Instrumentation

## Overview
This project demonstrates the use of Ansible and Terraform to provision resources and configure a containerized e-commerce web application. 

### Key Features:
- **Stage 1**: The application is set up and provisioned using **Ansible**, with configurations for containerization and Docker management.
- **Stage 2**: This stage integrates **Terraform** for resource provisioning, while **Ansible** is used for configuring the server and deploying the application. The goal is to automate the entire process with one command to both provision and configure the server.

### Folder Structure:

yoloproject/
│
├── stage_two/
│ ├── ansible/
│ ├── terraform/
│ ├── README.md
│ └── explanation.md
└── README.md


### **Stage 2 Changes**
- **Terraform Integration**: Provisioning resources using Terraform.
- **Ansible Integration**: Configuration of the server and deployment of containers via Ansible.
- **Playbook Execution**: The entire environment (including infrastructure provisioning and application configuration) is set up with the execution of the Ansible playbook.

## Requirements
- **Vagrant**: For local VM provisioning.
- **Terraform**: For infrastructure provisioning.
- **Ansible**: For configuration management.
- **Docker**: For containerized components of the web application.

## How to Run the Project

1. Clone the repository:
    ```bash
    git clone https://github.com/Bella-oreo/yolo.git
    cd yoloproject/stage_two
    ```

2. Run the Vagrant VM:
    ```bash
    vagrant up --provision
    ```

3. The playbook will automatically provision the server and launch the application, which can be accessed in your browser.

## Expected Outcome
- The e-commerce platform will be set up and accessible via the browser.
- You can test the "Add Product" functionality in the app, which is fully containerized using Docker.

## Deliverables
- Well-structured Terraform and Ansible configurations.
- Functional web application (E-commerce platform).
- **explanation.md** for the reasoning behind the setup and structure.


