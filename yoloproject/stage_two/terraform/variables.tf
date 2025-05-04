variable "vagrant_command" {
  description = "Command to bring up Vagrant VM"
  type        = string
  default = "vagrant up --provision "  

}

variable "ansible_playbook_command" {
  description = "Command to run Ansible playbook"
  type        = string
  default     = "ansible-playbook ../ansible/playbook.yml -i ../ansible/inventory.ini"
}


