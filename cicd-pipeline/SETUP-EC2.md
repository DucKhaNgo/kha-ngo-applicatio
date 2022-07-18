1. Launch new EC2 instance using [EC2 console](https://ap-southeast-1.console.aws.amazon.com/ec2/v2/home?region=ap-southeast-1#Home:)
2. SSH to this EC2 instance
3. In terminal of this EC2 instance, copy files `pipeline.sh` and `setup-ec2` to `~/` dir of EC2 instance. These files are located in `cicd-pipeline` dir of repo
4. Then run `bash ~/setup-ec2` to set up environment
5. Gain SSH access to:
  - Trusted machines
  - [Bitbucket Pipelines](https://bitbucket.org/dapatvista/mypay-api-nodejs/admin/addon/admin/pipelines/ssh-keys). This includes adding public key of Bitbucket to `~/.ssh/authorized_keys` of EC2 instance and adding ipv4 of EC2 instance to Bitbucket's known host
6. Go to [Bitbucket Access keys](https://bitbucket.org/dapatvista/mypay-api-nodejs/admin/access-keys/), then add SSH public key of this EC2 instance in order to clone repository. The public key can be found in EC2 terminal at `~/.ssh/id_ed25519.pub`
7. Go to [Bitbucket Deployments](https://bitbucket.org/dapatvista/mypay-api-nodejs/admin/addon/admin/pipelines/deployment-settings) and add/edit appropriate setting