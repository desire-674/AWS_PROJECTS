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

index.mjs:

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

// Clients
const s3 = new S3Client({
  region: "ap-south-1",
  forcePathStyle: true, 
});

const dynamo = new DynamoDBClient({ region: "ap-south-1" });

// Simple UUID v4 generator

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Main Lambda handler

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: "",
    };
  }

  try {
    const { name, email, resumeFileName, resumeFileContentBase64 } = JSON.parse(
      event.body
    );

    if (!name || !email || !resumeFileName || !resumeFileContentBase64) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ message: "Missing required fields." }),
      };
    }

    const applicationId = uuidv4();

    // Upload resume to S3
    const s3Key = `resumes/${applicationId}-${resumeFileName}`;
    const buffer = Buffer.from(resumeFileContentBase64, "base64");

    await s3.send(
      new PutObjectCommand({
        Bucket: "desirejobportalfrontend", 
        Key: s3Key,
        Body: buffer,
        ContentType: "application/pdf",
        ServerSideEncryption: "AES256",
      })
    );


    await dynamo.send(
      new PutItemCommand({
        TableName: "JobApplications", 
        Item: {
          applicationId: { S: applicationId },
          name: { S: name },
          email: { S: email },
          resumeFileName: { S: resumeFileName },
          resumeS3Key: { S: s3Key },
          appliedAt: { S: new Date().toISOString() },
        },
      })
    );

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        message: "Application submitted successfully!",
        applicationId,
        resumeS3Key: s3Key,
      }),
    };
  } catch (error) {
    console.error("Error saving application:", error);

    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({
        message: "Failed to submit application",
        error: error.message,
      }),
    };
  }
};
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  };
}


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


