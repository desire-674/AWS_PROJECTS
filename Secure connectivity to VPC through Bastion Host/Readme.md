
Manual Method for Setting Up VPC and Accessing Private IP from Public IP in AWS Management Console

Step 1: Log in to AWS Management Console
1.	Navigate to the AWS Management Console.
2.	Log in with your AWS credentials.
Step 2: Create a VPC
1.	From the AWS Management Console, go to the VPC dashboard by selecting "VPC" from the "Services" menu.
2.	Click on "Your VPCs" in the left-hand menu.
3.	Click on the "Create VPC" button.
4.	In the "Create VPC" dialog:
o	Provide a name for the VPC.
o	Select an IPv4 CIDR block (e.g., 10.0.0.0/16).
o	Click on "Create VPC".
Step 3: Create Subnets
1.	In the VPC dashboard, click on "Subnets" in the left-hand menu.
2.	Click on the "Create subnet" button.
3.	In the "Create subnet" dialog:
o	Select your VPC.
o	Provide a name for the public subnet.
o	Select an Availability Zone.
o	Enter an IPv4 CIDR block for the public subnet (e.g., 10.0.1.0/24).
o	Click on "Create subnet".
4.	Repeat the steps to create a private subnet with a different IPv4 CIDR block (e.g., 10.0.2.0/24).
Step 4: Create and Attach an Internet Gateway
1.	In the VPC dashboard, click on "Internet Gateways" in the left-hand menu.
2.	Click on the "Create internet gateway" button.
3.	Provide a name for the Internet Gateway and click "Create internet gateway".
4.	Select the newly created Internet Gateway and click on "Actions" > "Attach to VPC".
5.	Select your VPC and click "Attach internet gateway".
Step 5: Create and Configure Route Tables
1.	In the VPC dashboard, click on "Route Tables" in the left-hand menu.
2.	Click on the "Create route table" button.
3.	In the "Create route table" dialog:
o	Provide a name for the route table (e.g., Public Route Table).
o	Select your VPC.
o	Click on "Create route table".
4.	Select the newly created route table, go to the "Routes" tab, and click on "Edit routes".
5.	Add a route with the destination "0.0.0.0/0" and target as the Internet Gateway you created earlier. Click "Save routes".
6.	Go to the "Subnet Associations" tab, click "Edit subnet associations", and select the public subnet. Click "Save associations".
7.	Repeat the steps to create another route table for the private subnet, but do not add a route to the Internet Gateway. Just associate it with the private subnet.
Step 6: Launch EC2 Instances
1.	From the AWS Management Console, go to the EC2 dashboard by selecting "EC2" from the "Services" menu.
2.	Click on the "Launch Instance" button.
3.	Follow the steps to launch an instance, and ensure you select the public subnet for the public instance and the private subnet for the private instance.
4.	For the public instance, ensure that the "Auto-assign Public IP" setting is enabled.
5.	Launch both instances and download the PEM key files for each instance.
Step 7: Configure SSH Access in AWS Cloud9
1.	From the AWS Management Console, go to the Cloud9 dashboard by selecting "Cloud9" from the "Services" menu.
2.	Create a new Cloud9 environment.
3.	In your Cloud9 environment, upload both PEM key files.
4.	Open a terminal in Cloud9 and set the correct permissions for both key files
chmod 400 public-instance-key.pem
chmod 400 private-instance-key.pem
5.	Connect to the public instance via SSH:
ssh -i public-instance-key.pem ec2-user@<public-instance-ip>
6.	Once logged into the public instance, transfer the private key file to the public instance:
scp -i public-instance-key.pem private-instance-key.pem ec2-user@<public-instance-ip>:~
7.	In the public instance, set the correct permissions for the private key file:
chmod 400 private-instance-key.pem
8.	From the public instance, connect to the private instance via SSH:
ssh -i private-instance-key.pem ec2-user@<private-instance-ip>
Step 8: Periodic Testing and Maintenance
1.	Periodically test the connectivity between the public and private instances to ensure access configurations are correct.
2.	Regularly review security group settings and ensure that only necessary ports are open.
3.	Monitor the network and instance performance using CloudWatch and other AWS monitoring tools.
4.	Implement regular backup and security procedures to maintain data protection and compliance.


                                               










                                                     Process
 
Step-1: Open Aws console   
     <p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step1.jpg" width="700" height="400">
</p>

Step-2:Search the search bar in VPC

  <p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step2.jpg" width="700" height="400">
</p>
Step-3:Create two Subnets
 
<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step3.jpg" width="700" height="400">
</p>

 <p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step3-1.jpg" width="700" height="400">
</p>

Step-4: Create and Attach an Internet Gateway

 <p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step4.jpg" width="700" height="400">
</p>

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step4-1.jpg" width="700" height="400">
</p>
                          
Step-5 : Create and Configure Route Tables

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step5.jpg" width="700" height="400">
</p>

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step5-1.jpg" width="700" height="400">
</p>

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step5-2.jpg" width="700" height="400">
</p>

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step5-3.jpg" width="700" height="400">
</p>


Step-6: Launch EC2 Instances

 

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step6.jpg" width="700" height="400">
</p>

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step6-1.jpg" width="700" height="400">
</p>

 <p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step6-2.jpg" width="700" height="400">
</p>


 


Step-7: Configure SSH Access in AWS Cloud9 
             
•	Create a cloud9 environment 

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step7.jpg" width="700" height="400">
</p>


•	Next click on open 

 
<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step7-1.jpg" width="700" height="400">
</p>



•	Next upload both the keys into the cloud9 

 <p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step7-2.jpg" width="700" height="400">
</p>


•	Open a terminal in Cloud9 and set the correct permissions for both key files:
    chmod 400 public.pem
    chmod 400 private.pem

    <p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step7-3.jpg" width="700" height="400">
</p>

•	Connect to the public instance via SSH:
ssh -i public-instance-key.pem ec2-user@<public-instance-ip>
 
<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step7-4.jpg" width="700" height="400">
</p>

 

•	Once logged into the public instance, transfer the private key file to the public instance:
scp -i public-instance-key.pem private-instance-key.pem ec2-user@<public-instance-ip>:~
•	Next connect to the private instance 
          ssh -i private-instance-key.pem ec2-user@<private-instance-ip>

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/Secure%20connectivity%20to%20VPC%20through%20Bastion%20Host/images/step7-5.jpg" width="700" height="400">
</p>
 
CHALLENGES FACED
1. Network Configuration Complexity
•	Description: Setting up a VPC with the correct subnets, route tables, and internet gateways can be complex and prone to errors.
•	Impact: Misconfigurations can prevent proper communication between public and private instances, leading to connectivity issues.
2. Security Group and NACL Misconfigurations
•	Description: Security Groups and Network ACLs (Access Control Lists) need to be configured correctly to allow SSH traffic and other necessary protocols.
•	Impact: Incorrect security settings can block necessary traffic, preventing access to the private instance from the public instance.
3. Instance Key Management
•	Description: Managing SSH keys for secure access to instances involves generating, distributing, and securing the keys.
•	Impact: Lost or compromised keys can lead to unauthorized access or inability to access the instances.
4. Public IP Address Allocation
•	Description: The public instance must have a public IP address or Elastic IP address assigned to it.
•	Impact: Failure to allocate a public IP to the public instance will prevent external access.
5. Firewall and IP Restrictions
•	Description: Firewalls and IP restrictions at various levels (instance, VPC, or corporate firewall) can block access.
•	Impact: Additional configuration might be required to allow traffic through these firewalls.
6. Transfer and Permission Issues for Key Files
•	Description: Proper permissions must be set on the SSH key files to ensure secure and successful SSH connections.
•	Impact: Incorrect permissions can result in SSH errors and failed connections.
7. Dependency on Bastion Host (Jump Box)
•	Description: The bastion host (public instance) acts as a bridge to the private instance.
•	Impact: Any issue with the bastion host (e.g., misconfiguration, resource limitations) can hinder access to the private instance.
8. Latency and Network Performance
•	Description: Network latency and performance issues can affect the responsiveness and reliability of connections.
•	Impact: Slow or unstable connections can make managing and interacting with the private instance challenging.
9. Monitoring and Troubleshooting
•	Description: Effective monitoring and troubleshooting tools are essential to identify and resolve connectivity issues.
•	Impact: Lack of proper monitoring can delay issue detection and resolution, leading to prolonged downtime or connectivity problems.
10. AWS Service Limits
•	Description: AWS imposes certain limits on resources (e.g., number of VPCs, instances, IP addresses).
•	Impact: Hitting these limits can prevent the creation of necessary resources for proper network configuration.
11. SSH Configuration and Connectivity
•	Description: SSH configuration (including the SSH daemon settings) on instances must be correctly set up.
•	Impact: Misconfigurations can lead to failed SSH connections, even if network settings are correct.
12. IAM Roles and Permissions
•	Description: Proper IAM roles and policies must be assigned to instances to ensure they can perform necessary tasks.
•	Impact: Incorrect IAM configurations can lead to access and authorization issues.
13. Data Transfer Security
•	Description: Ensuring secure data transfer between instances, especially when copying sensitive files like SSH keys.
•	Impact: Insecure transfer methods can lead to data breaches and unauthorized access.
By anticipating and addressing these challenges, you can improve the reliability and security of accessing private IP addresses from public IP addresses within AWS.

CONCLUSION

The project of configuring a VPC and accessing a private IP from a public IP in AWS highlights the importance of meticulous planning and execution in cloud network architecture. Through the step-by-step process of setting up a VPC, creating subnets, and configuring route tables, we have established a robust network infrastructure that supports both public and private instances.
Key Takeaways:
1.	Comprehensive VPC Setup: Creating a VPC with appropriate subnets, internet gateways, and route tables ensures a well-structured network environment. The clear separation between public and private subnets helps manage traffic and security effectively.
2.	Secure and Controlled Access: Using a public instance as a bastion host provides secure access to private instances without exposing them directly to the internet. This approach enhances security while maintaining the ability to manage private resources.
3.	Effective Key Management: Proper handling of SSH keys and permissions is crucial for secure access. The use of Cloud9 for managing key files and establishing SSH connections simplifies the process and helps maintain security standards.
4.	Challenges and Solutions: Addressing challenges such as network configuration complexities, security group settings, and key management ensures a smoother setup and operation. By anticipating potential issues and implementing best practices, the overall reliability and functionality of the network are improved.
5.	Periodic Testing and Maintenance: Regular testing and monitoring of the network setup ensure that configurations remain correct and effective. Establishing a routine for reviewing and updating the setup helps in adapting to any changes in requirements or AWS updates.
Overall, this project demonstrates how to successfully implement a secure and scalable network architecture within AWS, providing a foundation for further development and deployment of cloud-based applications. The skills and knowledge gained from this project are essential for managing complex cloud environments and ensuring robust and secure network connectivity.

