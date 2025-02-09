import { generateContent } from "./script/chatbotApi.js";

const textAreaInputBox = document.querySelector("#user-input")
const sendButton = document.querySelector(".send-input-button")

sendButton.addEventListener("click", sendInputFunc)

textAreaInputBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter"){
        sendInputFunc()
    }
})

async function sendInputFunc() {
    const userInput = textAreaInputBox.value.trim();
    const headerTitle = document.querySelector(".header-title")

    if (userInput === "") {
        return;
    }

    headerTitle.style.display = 'none'

    const userTextBox = document.createElement("div");
    userTextBox.classList.add("user-text-box");
    userTextBox.textContent = userInput;

    const aiTextBox = document.createElement("div");
    aiTextBox.classList.add("ai-text-box");
    aiTextBox.textContent = "Thinking..."; 

    const promptBox = document.querySelector(".prompt-box");
    promptBox.appendChild(userTextBox);
    promptBox.appendChild(aiTextBox);

    textAreaInputBox.value = "";

    try {
        const aiResponse = await generateContent(userInput); 
        aiTextBox.textContent = aiResponse || "Error: No response"; 

        
    window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
    });

    } catch (error) {
        aiTextBox.textContent = "Error generating response"; 
        console.error(error);
    }
}
