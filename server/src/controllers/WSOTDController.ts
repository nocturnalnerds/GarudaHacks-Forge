import { RequestHandler } from 'express';
import OpenAI from "openai";
import { JsonFormatSOTD, JsonFormatWOTD } from '../utils/jsonFormat';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});



const getPromptWotd = (language: string) => {
    return `Beri saya Word of the Day/Kata harian random di bahasa ${language}`;
}

const getPromptSotd = (language: string) => {
    return `Beri saya sentence of the Day/Kalimat yang digunakan sehari hari random di bahasa ${language}`;
}



export const getWordOfTheDay:RequestHandler = async (req, res) => {
    const { language } = req.body;
    if (!language) {
        res.status(400).json({ error: 'Language is required' });
        return;
    }

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
            res.status(500).json({ error: 'No content received from OpenAI' });
            return;
        }
        
        const wordOfTheDay = JSON.parse(content);
        res.json(wordOfTheDay);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch word of the day' });
    }
};

export const sentenceOfTheDay:RequestHandler = async (req, res) => {
    const { language } = req.body;
    if (!language) {
        res.status(400).json({ error: 'Language is required' });
        return;
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: `Kamu adalah AI untuk memberi Kalimat/Sentence panjang untuk belajar berikan kalimat - kalimat lumayan panjang random setiap kali dan jawab dengan format ${JsonFormatSOTD}`},
                { role: 'user', content: getPromptSotd(String(language)) }
            ],
            max_tokens: 2048,
            temperature: 0.9,
        });

        const content = response.choices[0].message.content;
        if (!content) {
            res.status(500).json({ error: 'No content received from OpenAI' });
            return;
        }

        const sentenceOfTheDay = JSON.parse(content);
        res.json(sentenceOfTheDay);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch word of the day' });
    }
};