import React from "react";

interface ChatMessageProps {
	message: string;
	isAi: boolean;
}

export function ChatMessage({ message, isAi }: ChatMessageProps) {
	return (
		<div className="flex flex-row gap-4 w-full">
			{isAi && <img src="/datasulting-logo.svg" alt="Datasulting" className="w-8 h-8 self-start" />}

			<div className={`flex ${isAi ? "justify-start" : "justify-end"} mb-4 w-full`}>
				<div className={`max-w-[80%] rounded-lg px-4 py-2 h-fit break-words ${isAi ? "bg-white text-gray-800 shadow-sm" : "bg-green-600 text-white"}`}>
					<p className="text-sm md:text-base w-full break-words">{message}</p>
				</div>
			</div>
		</div>
	);
}
