/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

const workerUrl = "https://dawn-sound-3481.mobleyjeremiah05.workers.dev/";
const baseSystemPrompt =
  "You are a helpful L'Oréal beauty advisor. Answer only questions about L'Oréal products, skincare routines, haircare routines, makeup, fragrances, and beauty recommendations. If the user asks something unrelated to beauty, L'Oréal, or personalized beauty guidance, politely refuse and say that you can only help with L'Oréal-related beauty topics and recommendations.";

let conversationHistory = [];
let userName = "";

function addMessage(text, role) {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${role}`;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function addPromptPreview(question) {
  const preview = document.createElement("div");
  preview.className = "prompt-preview";
  preview.innerHTML = `<span class="prompt-label">You asked:</span><div>${question}</div>`;
  chatWindow.appendChild(preview);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getSystemPrompt() {
  if (userName) {
    return `${baseSystemPrompt} The user's name is ${userName}. Remember it for future replies.`;
  }

  return baseSystemPrompt;
}

function updateNameFromMessage(message) {
  const nameMatch = message.match(/my name is ([a-zA-ZÀ-ÿ'-]+)/i);
  if (nameMatch) {
    userName = nameMatch[1].trim();
  }
}

function showWelcomeMessage() {
  addMessage("👋 Hello! How can I help you today?", "assistant");
}

showWelcomeMessage();

/* Handle form submit */
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) {
    return;
  }

  updateNameFromMessage(message);
  addMessage(message, "user");
  userInput.value = "";

  const loadingMessage = document.createElement("div");
  loadingMessage.className = "bubble assistant loading";
  loadingMessage.textContent = "Thinking...";
  chatWindow.appendChild(loadingMessage);

  try {
    const requestMessages = [{ role: "system", content: getSystemPrompt() }];

    conversationHistory.forEach((entry) => {
      requestMessages.push({ role: entry.role, content: entry.text });
    });

    requestMessages.push({ role: "user", content: message });

    const response = await fetch(workerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: requestMessages,
      }),
    });

    if (!response.ok) {
      throw new Error("The chatbot could not respond right now.");
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I do not have a reply yet.";

    chatWindow.removeChild(loadingMessage);
    addPromptPreview(message);
    addMessage(reply, "assistant");

    conversationHistory.push({ role: "user", text: message });
    conversationHistory.push({ role: "assistant", text: reply });
  } catch (error) {
    chatWindow.removeChild(loadingMessage);
    addMessage(
      "Sorry, I could not get a response right now. Please try again.",
      "assistant",
    );
    console.error(error);
  }
});
