import { envVars } from "../../config/env";
import { FileModel } from "./fileUp.model";


export const saveFileInfo = async (key: string, size: number, type: string) => {
  const url = `https://${envVars.S3.S3_BUCKET_NAME}.s3.${envVars.S3.S3_REGION}.amazonaws.com/${key}`;

  const file = await FileModel.create({
    url,
    key,
    size,
    type,
  });

  return file;
};