import axios from 'axios';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  endpoint: process.env.WASABI_ENDPOINT,
  region: process.env.WASABI_REGION,
  credentials: {
    accessKeyId: process.env.WASABI_KEY!,
    secretAccessKey: process.env.WASABI_SECRET!,
  },
});

export async function fetchTTS(lang: string, text: string): Promise<string | null> {
  try {
    const response = await axios.post(
      `${process.env.AI_API}`,
      { lang, text },
      { responseType: 'arraybuffer' }
    );

    const buffer = Buffer.from(response.data);
    const key = `tts/${lang}-${uuidv4()}.wav`;

    await s3.send(new PutObjectCommand({
      Bucket: process.env.WASABI_WSOTD_BUCKET!,
      Key: key,
      Body: buffer,
      ACL: 'public-read',
      ContentType: 'audio/wav',
    }));

    console.log(`[TTS] Uploaded to ${process.env.WASABI_WSOTD_BUCKET}`);
    const command = new GetObjectCommand({
        Bucket: process.env.WASABI_WSOTD_BUCKET!,
        Key: key,
    });
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 86400 });
    return signedUrl;
  } catch (error) {
    console.error("[TTS] Failed to get or upload audio:", error);
    return null;
  }
}


