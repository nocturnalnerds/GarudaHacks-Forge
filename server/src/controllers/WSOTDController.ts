import { RequestHandler } from 'express';
import OpenAI from "openai";
import { JsonFormatSOTD, JsonFormatWOTD } from '../utils/jsonFormat';
import axios from 'axios';
import fs from 'fs';
import { fetchTTS } from '../utils/TTS';
import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});



const getPromptWotd = (language: string) => {
    return `Beri saya Word of the Day/Kata harian random di bahasa ${language}`;
}

const getPromptSotd = (language: string) => {
    return `Beri saya sentence of the Day/Kalimat yang digunakan sehari hari random di bahasa ${language}`;
}

export enum Language {
    javanese = 'java',
    bali = 'bali',
    sunda = 'sunda',
    madura = 'madura',
    makasar = 'makasar'
}



export const getWordOfTheDay = async (language: string) => {

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: `Kamu adalah AI untuk memberi Kata untuk belajar berikan kata - kata random setiap kali dan jawab dengan format ${JsonFormatWOTD}`},
                { role: 'user', content: getPromptWotd(String(language)) }
            ],
            max_tokens: 2048,
            temperature: 0.9,
        });



        const content = response.choices[0].message.content;
        if (!content) {
            console.log("Content failed to be generated!")
            return;
        }
        
        const wordOfTheDay = JSON.parse(content);
        const word = wordOfTheDay.response;
        
        const signedUrl = await fetchTTS(Language[language as keyof typeof Language], word.wotd);
        await prisma.wotd.create({
            data: {
                content: word.wotd,
                translation: word.indonesian_translation,
                definition: word.definisi_singkat,
                example: word.contoh_penggunaan_bahasa_daerah_tersebut,
                language: language,
                signedUrl: signedUrl || '',
            }
        });
        return {
            sotd: word.wotd,
            translation: word.indonesian_translation,
            definisi: word.definisi_singkat,
            example: word.contoh_penggunaan_bahasa_daerah_tersebut
        };
    } catch (error) {
        console.log(error);
    }
};

export const sentenceOfTheDay = async (language: string) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: `Kamu adalah AI untuk memberi Kalimat/Sentence panjang untuk belajar berikan kalimat - kalimat lumayan panjang random setiap kali dan jawab dengan format ${JsonFormatSOTD}`},
                { role: 'user', content: getPromptSotd(String(language)) }
            ],
            max_tokens: 4096,
            temperature: 0.9,
        });

        const content = response.choices[0].message.content;
        if (!content) {
            console.log("Content failed to be generated!")
            return;
        }
        // console.log(content);

        const sentenceOfTheDay = JSON.parse(content);
        const sentence = sentenceOfTheDay.response;
        console.log(Language[language as keyof typeof Language]);
        const signedUrl = await fetchTTS(Language[language as keyof typeof Language], sentence.sotd);
        await prisma.sotd.create({
            data: {
                content: sentence.sotd,
                translation: sentence.indonesian_translation,
                definition: sentence.definisi_singkat,
                example: sentence.contoh_penggunaan_bahasa_daerah_tersebut,
                language: language,
                signedUrl: signedUrl || ''
            }
        });
        return {
            sotd: sentence.sotd,
            translation: sentence.indonesian_translation,
            definisi: sentence.definisi_singkat,
            example: sentence.contoh_penggunaan_bahasa_daerah_tersebut
        };

    } catch (error) {
        console.log(error);
    }
};


const wordRouter = Router();

wordRouter.post('/wotd/:language', async (req, res) => {
    const { language } = req.params;
    try {
        const result = await getWordOfTheDay(language);
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate Word of the Day.' });
    }
});

wordRouter.post('/sotd/:language', async (req, res) => {
    const { language } = req.params;
    try {
        await sentenceOfTheDay(language);
        res.status(200).json({ message: 'Sentence of the Day generated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate Sentence of the Day.' });
    }
});

export default wordRouter;