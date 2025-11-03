import { Request } from "express";
import multer, {FileFilterCallback} from "multer";
import multerS3 from 'multer-s3';
import { S3Client } from "@aws-sdk/client-s3";


const s3 = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || ''
    }
});


const storage = multerS3({
    s3: s3,
    bucket: 'emilio-iteso-p2025', 
    metadata: (req, file, cb) => {
        cb(null, {...file})
    },
    acl: 'public-read',
    key: (req, file, cb) => {
        cb(null, file.originalname);   
    }
});


const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    cb(null, file.mimetype.startsWith('image/')) 
}



export const uploadS3 = multer({ 
    storage, 
    fileFilter
});