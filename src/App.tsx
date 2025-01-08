import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { ChatInterface } from './components/ChatInterface';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  return <ChatInterface />;
}

export default App;