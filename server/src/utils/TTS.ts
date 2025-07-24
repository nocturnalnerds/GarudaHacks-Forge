import axios from 'axios';
import fs from 'fs';

async function fetchTTS(lang: string, text: string) {
  try {
    const response = await axios.post(`${process.env.AI_API}`, {
      lang,
      text,
    }, {
      responseType: 'arraybuffer', // Important: to receive raw binary
    });

    fs.writeFileSync('output.wav', Buffer.from(response.data));
    console.log('TTS saved to output.wav');
  } catch (error) {
    console.log("Failed to get audio", error);
  }
}

