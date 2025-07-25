import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const createOpenAIRequest = async (request: string, promptRole: string, model: string = "gpt-3.5-turbo", image_url="") => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
        {role: 'system', content: `${promptRole}`},
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: request,
                },
            ],
        },
        ],
        temperature: 1,
        max_tokens: 8192,
        top_p: 1,
    });
    return response.choices[0].message.content;
}