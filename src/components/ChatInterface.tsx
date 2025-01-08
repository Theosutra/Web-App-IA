import React, { useState, useRef } from "react";
import { SendHorizontal } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { callChatGPT } from "../api/chatgpt"; // Importez la fonction API

export function ChatInterface({ onLogout }: { onLogout: () => void }) {
  const [messages, setMessages] = useState<Array<{ text: string; isAi: boolean }>>([
    { text: "Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui ?", isAi: true }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, isAi: false }]);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setIsTyping(true);

    // Appeler l'API ChatGPT
    const response = await callChatGPT([
      { role: "system", content: "Tu es un assistant utile." }, // Message système (facultatif)
      ...messages.map((msg) => ({
        role: msg.isAi ? "assistant" : "user",
        content: msg.text,
      })),
      { role: "user", content: userMessage }
    ]);

    setMessages((prev) => [...prev, { text: response, isAi: true }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 relative">
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold text-gray-800">Data'sistant</h1>
        </div>
        <button
          onClick={onLogout}
          className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
        >
          Déconnexion
        </button>
      </div>

      <div className="flex w-full overflow-y-auto px-4 py-6 relative justify-center h-full">
        <div className="relative z-10 w-[90%] max-w-[848px]">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message.text} isAi={message.isAi} />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      </div>

      <div className="z-50 my-4 mx-auto w-[90%] max-w-[800px]">
        <div className="flex space-x-4">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Écrivez votre message..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            rows={1}
          />
          <button
            onClick={handleSend}
            className="bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-10 h-10 flex items-center justify-center"
          >
            <SendHorizontal className="w-6 h-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
