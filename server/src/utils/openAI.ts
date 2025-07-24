import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function createOpenAIRequest(request: string, promptRole: string, model: string = "gpt-3.5-turbo", image_url="") {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: promptRole + request,
                },
            ],
        },
        ],
        temperature: 1,
        max_tokens: 300,
        top_p: 1,
    });
    return response.choices[0].message.content;
}