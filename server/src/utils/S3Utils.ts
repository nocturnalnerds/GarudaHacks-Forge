
import { S3Client } from "@aws-sdk/client-s3";

import multer from 'multer';
import multerS3 from 'multer-s3';


const s3Client = new S3Client({
    endpoint: process.env.WASABI_ENDPOINT,
    region: process.env.WASABI_REGION,
    credentials: {
        accessKeyId: process.env.WASABI_KEY!,
        secretAccessKey: process.env.WASABI_SECRET!
    }
});

export const upload = (bucket: string) => multer({
    storage: multerS3({
        s3: s3Client,
        bucket: bucket,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => cb(null, `images/${Date.now()}-${file.originalname}`)
    })
});
