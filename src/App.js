import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputUrl, setInputUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleShorten = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/shorten`, {
        original_url: inputUrl,
      });
      setShortUrl(res.data.short_url);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to shorten URL');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>🔗 URL Shortener</h2>
      <input
        type="text"
        placeholder="Paste your long URL"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <br /><br />
      <button onClick={handleShorten}>Shorten</button>
      <br /><br />
      {shortUrl && (
        <p>
          Shortened URL: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
        </p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
