import React, { useState, useRef } from "react";
import { SendHorizontal, Settings } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";

export function ChatInterface() {
	const [messages, setMessages] = useState<Array<{ text: string; isAi: boolean }>>([{ text: "Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui ?", isAi: true }]);
	const [input, setInput] = useState("");
	const [isTyping, setIsTyping] = useState(false);

	// Ref pour le textarea
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleSend = async () => {
		if (!input.trim()) return;

		const userMessage = input.trim();
		setInput("");
		setMessages((prev) => [...prev, { text: userMessage, isAi: false }]);

		// Réinitialiser la hauteur du textarea
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
		}

		setIsTyping(true);
		setTimeout(() => {
			setMessages((prev) => [...prev, { text: "Ceci est une démo. Dans une vraie application, je serais connecté à une IA.", isAi: true }]);
			setIsTyping(false);
		}, 1500);
	};

	return (
		<div className="flex flex-col h-screen bg-gray-50 relative">
			<div className="bg-white border-b px-4 py-3 flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<h1 className="text-xl font-semibold text-gray-800">Assistant IA</h1>
				</div>
				<button className="p-2 hover:bg-gray-100 rounded-full">
					<Settings className="w-5 h-5 text-gray-600" />
				</button>
			</div>

			<div className="flex w-full overflow-y-auto px-4 py-6 relative justify-center h-full">
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
					<img src="/datasulting-logo.svg" alt="Datasulting" className="w-64 h-64" />
				</div>
				<div className="relative z-10 w-[90%] max-w-[848px] mr-6">
					{messages.map((message, index) => (
						<ChatMessage key={index} message={message.text} isAi={message.isAi} />
					))}
					{isTyping && <TypingIndicator />}
				</div>
			</div>

			<div className="z-50 my-4 mx-auto w-[90%] max-w-[800px] min-h-10 max-h-64 h-fit absolute bottom-0 left-1/2 transform -translate-x-1/2">
				<div className="flex space-x-4 min-h-10 w-full items-end max-h-64 h-fit ">
					<textarea
						ref={textareaRef} // Ajouter la référence
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onInput={(e) => {
							const target = e.target as HTMLTextAreaElement;
							target.style.height = "auto"; // Réinitialiser la hauteur pour recalculer
							const adjustedHeight = Math.min(target.scrollHeight, 256); // Limiter à 256px
							target.style.height = `${adjustedHeight}px`; // Appliquer la hauteur ajustée
						}}
						onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
						placeholder="Écrivez votre message..."
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none overflow-y-auto items-center justify-center flex min-h-10"
						style={{
							maxHeight: "256px", // Correspond à `max-h-64` en Tailwind
							lineHeight: "20px", // Ligne ajustée pour mieux calculer la hauteur
						}}
						rows={1} // Définit la hauteur par défaut pour une ligne
					/>
					<button onClick={handleSend} className="bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-10 h-10 flex items-center justify-center">
						<SendHorizontal className="w-6 h-auto" />
					</button>
				</div>
			</div>
		</div>
	);
}
