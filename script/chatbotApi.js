import { models } from "./models.js"

export const generateContent = async (userMessage) => {
    const API_KEY = models.GEMINI_API_KEY;
    const API_URL = `${models.GEMINI_API_URL}key=${API_KEY}`;
    const requestBody = {
        contents: [
            {
                parts: [{ text: userMessage }]
            }
        ]
    };
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        })

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${await response.text()}`);
        }



        const data = await response.json();
        const message = data?.candidates?.[0]?.content?.parts?.[0]?.text
        console.log("AI Response:", message);
        return message;

    } catch (error) {
        console.warn(error)
    }
}
