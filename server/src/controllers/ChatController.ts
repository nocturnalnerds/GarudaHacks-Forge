import axios from 'axios';
import { createOpenAIRequest } from '../utils/openAI';
import { RequestHandler } from 'express';
import { JsonFormatResponseChat } from '../utils/jsonFormat';
import { PrismaClient } from '@prisma/client';
import { fetchImageFromBrave } from '../utils/imageSearch';

const prisma = new PrismaClient();


export const sendRequestToAI: RequestHandler = async (req, res) => {
    try {
        const {lang, userId} = req.params;
        const { message } = req.body;

        
        await prisma.chat.create({
            data:{
                from: userId,
                to: `AI_${lang}`,
                message
            }
        });
        

        const prompt = `Kamu adalah seorang individu berwawasan luas tentang budayamu sebagai orang ${lang}, berbicaralah menggunakan bahasa daerah ${lang} dengan fasih, jika apa yang diminta user membutuhkan visualisasi gambar, beri pada response json ini ${JsonFormatResponseChat} dan toggle image jadi true jika dirasah butuh untuk memberi pemahamin lebih terkait apa yang anda bahas. Dan jangan gunakan attribut agama / ras / suku apapun`

        const balasan = await createOpenAIRequest(message, prompt) as string;
        if(!balasan){
            res.status(500).json("AI failed to give response!");
            return;
        }

        let AIResponse;
        try {
            AIResponse = JSON.parse(balasan);
        } catch (parseError) {
            console.error('Failed to parse AI response as JSON:', parseError, 'Response:', balasan);
            res.status(500).json({ error: 'AI response is not valid JSON.' });
            return;
        }
        const imageToggle = AIResponse.response.image as boolean;
        let imageFetch;
        if(imageToggle){
            imageFetch = await fetchImageFromBrave(AIResponse.response.keyMessage);
            console.log(imageFetch)
        }
        await prisma.chat.create({
            data:{
                from: `AI_${lang}`,
                to: userId,
                message: AIResponse.response.message,
                translation: AIResponse.response.indonesian_translation,
                imageUrl: imageFetch || '', 
            }
        })

        const customResposne = {
            message: AIResponse.response.message,
            translation: AIResponse.response.indonesian_translation,
            imageUrl: imageFetch || '', 
        }
        res.status(200).json(customResposne);
    } catch (error) {
        console.error('Error sending request to AI:', error);
        res.status(500).json({ error: 'Failed to process request.' });
    }
}

export const getUserChats: RequestHandler = async (req, res) => {
    try {
        const { userId, lang } = req.params;

        const chats = await prisma.chat.findMany({
            where: {
                OR: [
                    { from: userId, to: `AI_${lang}` },
                    { from: `AI_${lang}`, to: userId }
                ],
            },
            orderBy: {
                timestamp: 'asc'
            }
        });

        res.status(200).json(chats);
    } catch (error) {
        console.error('Error fetching user chats:', error);
        res.status(500).json({ error: 'Failed to fetch user chats.' });
    }
};