import axios from 'axios';

const API_KEY = ''; // Remplacez par votre clé API
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const callChatGPT = async (messages: { role: string; content: string }[]) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-4o-mini', // Ou 'gpt-4' selon votre besoin
        messages: messages,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Erreur lors de l’appel à l’API ChatGPT :', error);
    return 'Une erreur est survenue. Veuillez réessayer.';
  }
};
