import { S3Client } from "@aws-sdk/client-s3";
import { envVars } from "./env"
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";


export const s3Client = new S3Client({
  region: envVars.S3.S3_REGION,
  credentials: {
    accessKeyId: envVars.S3.S3_ACCESS_KEY as string,
    secretAccessKey: envVars.S3.S3_SECRET_KEY as string,
  },
});

// Generate Upload Url
export const generateUploadUrl = async (fileName: string, fileType: string) => {
  const key = `uploads/${Date.now()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: envVars.S3.S3_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 60,
  });

  return {
    uploadUrl,
    key,
  };
};

// Delete File From S3
export const deleteFileFromS3 = async (key: string) => {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: envVars.S3.S3_BUCKET_NAME,
      Key: key,
    })
  );
};

// Image Resize
export const resizeImage = async (buffer: Buffer) => {
  return await sharp(buffer)
    .resize(800)
    .jpeg({ quality: 80 })
    .toBuffer();
};