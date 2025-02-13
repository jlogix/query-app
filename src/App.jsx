import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://python-green-cat-jmatix629943.codeanyapp.com/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Ask me:</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Ask me:"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {responseMessage && <div className="response-message">{responseMessage}</div>}
    </div>
  );
}

export default App;
