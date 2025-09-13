
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

