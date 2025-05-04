resource "null_resource" "provision_local_vm" {
  provisioner "local-exec" {
    command = var.vagrant_command
  }

  triggers = {
    always_run = timestamp()
  }
}

resource "null_resource" "run_ansible" {
  depends_on = [null_resource.provision_local_vm]

  provisioner "local-exec" {
    command = var.ansible_playbook_command
  }

}


