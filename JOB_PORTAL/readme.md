LINK TO JOBPORTAL: https://d1yfs7otxhx998.cloudfront.net/


JOB PORTAL WITH CLOUD DEPLOYMENT


Step 1:

get the front end resorces developed

index.html, style.css


Step 2: Deploy the Frontend on S3 and CloudFront



Create S3 Bucket
Go to S3 in the AWS Management Console.
Click on Create bucket.
Bucket name:
Region: Select a region close to your users.
Uncheck "Block all public access" to make the website accessible publicly.
Enable Static website hosting.
Index document: index.html



2.2. Upload Website Files


You can use the AWS Management Console or the AWS CLI to upload your frontend files (HTML, CSS).

2.3. Configure CloudFront


In the AWS Management Console, go to CloudFront and click on Create Distribution.
Under Origin Domain, select your S3 bucket.
Set Default root object to index.html. Review and click Create Distribution.
similarly create for api after creating the post method


Step 3: Set Up Lambda and API Gateway for Backend


3.1. Create Lambda Function
In the AWS Management Console, go to Lambda and click Create Function.
Choose Author from scratch.
Function name: JobPortalBackend.
Runtime: Choose your backend language
Write the code for the Lambda function:

can be found in index.mjs:

Click Deploy to save the function.


3.2. Set Up API Gateway
In the AWS Management Console, go to API Gateway and click Create API.
Choose REST API and New API.
Create a new resource (e.g., /apply), and create a POST method.
In the integration setup, choose Lambda Function and select your Lambda function (JobPortalBackend).
Deploy the API by creating a Stage (e.g., prod).
Note the API endpoint URL and integrate it into your frontend form action.



Step 4: Set Up DynamoDB for Storing Job Applications

4.1. Create DynamoDB Table
Go to DynamoDB in the AWS Management Console.
Click Create Table.
Table name: JobApplications.
Partition key: applicationId (String).
click Create Table.


4.2. Integrate DynamoDB in Lambda

Update the Lambda function to store job applications in DynamoDB


Step 5: Monitor with CloudWatch

Go to CloudWatch in the AWS Console.
Set up basic logging for Lambda and API Gateway.
Monitor function invocations, API calls, and any potential errors.

Final Project Summary:

Frontend: Hosted on S3 and distributed via CloudFront.
Backend: Lambda and API Gateway for handling job applications.
Database: DynamoDB for storing job application data.


<h1>IMAGES FOR CLEAR UNDERSTANDING </h1>

<h3>S3 Configuration</h3>

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/JOB_PORTAL/S31.png" width="700" height="400">
</p>

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/JOB_PORTAL/S32.png" width="700" height="400">
</p>

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/JOB_PORTAL/S33.png" width="700" height="400">
</p>

<h3>CloudFront Distribution</h3>

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/JOB_PORTAL/CF1.png" width="700" height="400">
</p>


<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/JOB_PORTAL/CF2.png" width="700" height="400">
</p>

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/JOB_PORTAL/CF3.png" width="700" height="400">
</p>

<h3>DynamoDB</h3>

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/JOB_PORTAL/DB1.png" width="700" height="400">
</p>

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/JOB_PORTAL/DB2.png" width="700" height="400">
</p>

<h3>API Gateway</h3>

<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/JOB_PORTAL/A1.png" width="700" height="400">
</p>

p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/JOB_PORTAL/A2.png" width="700" height="400">
</p>


<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/JOB_PORTAL/A2.png" width="700" height="400">
</p>


<h3>AWS Lambda</h3>


<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/JOB_PORTAL/L1.png" width="700" height="400">
</p>


<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/JOB_PORTAL/L2.png" width="700" height="400">
</p>

<h3>JOB PORTAL</h3>


<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/JOB_PORTAL/J1.png" width="700" height="400">
</p>



<p align="center">
  <img src="https://github.com/desire-674/AWS_PROJECTS/blob/main/JOB_PORTAL/J2.png" width="700" height="400">
</p>


