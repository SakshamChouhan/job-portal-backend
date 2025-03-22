const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3 = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadToS3 = async (file) => {
  try {
    const fileName = `${Date.now()}_${file.originalname}`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    // Return the URL of the uploaded file
    return `https://${process.env.S3_BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("❌ S3 Upload Failed:", error);
    throw new Error("Failed to upload to S3");
  }
};

const AWS = require('aws-sdk');
const s32 = new AWS.S3();
const url = require('url');

const getResumeUrl = async (resumeUrl) => {
  try {
    
    const parsedUrl = url.parse(resumeUrl);
    const key = decodeURIComponent(parsedUrl.pathname.substring(1)); 
    if (!key) {
      throw new Error('Invalid key extracted from URL');
    }

    const params = {
      Bucket: 'job-portal-resumes-bucket',  
      Key: key,  
      Expires: 60 * 5, 
    };

    const signedUrl = await s32.getSignedUrlPromise('getObject', params);
  
    return signedUrl;  
  } catch (error) {
    console.error('❌ Error generating presigned URL:', error);
    throw new Error('Error generating resume URL');
  }
};




module.exports = { uploadToS3, getResumeUrl };
