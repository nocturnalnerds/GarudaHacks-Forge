import { Request, Response } from 'express';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export const uploadMultipleFiles = [
    upload.any(),
    (req: Request, res: Response) => {
        const filesAndCaptions: { file?: Express.Multer.File; caption?: string }[] = [];

        // Map files by fieldname (pic1, pic2, ...)
        const fileMap: { [key: string]: Express.Multer.File } = {};
        req.files?.forEach((file: Express.Multer.File) => {
            fileMap[file.fieldname] = file;
        });

        // Find all pic/caption pairs dynamically
        let i = 1;
        while (fileMap[`pic${i}`] || req.body[`caption${i}`]) {
            filesAndCaptions.push({
                file: fileMap[`pic${i}`],
                caption: req.body[`caption${i}`]
            });
            i++;
        }

        res.json({
            message: 'Files and captions received',
            data: filesAndCaptions.map(({ file, caption }) => ({
                filename: file?.originalname,
                caption,
            })),
        });
    }
];
