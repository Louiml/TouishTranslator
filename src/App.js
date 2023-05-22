import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const TouishTranslator = () => {
  const [englishText, setEnglishText] = useState('');
  const [touishText, setTouishText] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const translateToTouish = () => {
    axios
      .post('https://touishapi.louiml.net/translate', { text: englishText })
      .then(response => {
        console.log('API Response:', response.data);
        const translatedText = response.data.translation;
        setTouishText(translatedText);
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(touishText);
  };

  return (
    <div className={`container ${theme}`}>
      <div className="input-container">
        <input
          className={`input-field ${theme}`}
          type="text"
          placeholder="Enter text..."
          value={englishText}
          onChange={event => setEnglishText(event.target.value)}
        />
        <button className={`button ${theme}`} onClick={translateToTouish}>
          Translate
        </button>
      </div>
      <div className={`result ${theme}`} onClick={copyToClipboard}>
        {touishText}
      </div>
      <button className={`theme-toggle-button ${theme}`} onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
      </button>
    </div>
  );
};

export default TouishTranslator;
