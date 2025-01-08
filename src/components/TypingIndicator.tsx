import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 p-4">
      <div className="text-sm text-gray-500">L'IA est en train d'écrire</div>
      <div className="flex space-x-1">
        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
      </div>
    </div>
  );
}