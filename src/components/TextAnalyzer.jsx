import React, { useState, useEffect } from 'react';
import './TextAnalyzer.css';

const TextAnalyzer = () => {
  const [text, setText] = useState('');
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    const words = text.toLowerCase().split(/\W+/).filter(Boolean);
    const uniqueCount = new Set(words).size;
    const charCount = text.replace(/[^a-zA-Z0-9]/g, '').length;

    setUniqueWordCount(uniqueCount);
    setCharacterCount(charCount);
  }, [text]);

  const handleReplace = () => {
    if (searchString) {
      const regex = new RegExp(searchString, 'g');
      const newText = text.replace(regex, replaceString);
      setText(newText);
    }
    setSearchString('');
    setReplaceString('');
  };

  const renderTextWithHighlight = () => {
    const highlightedText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(new RegExp(`(${searchString})`, 'gi'), '<span class="highlight">$1</span>');
    return { __html: highlightedText };
  };

  return (
    <div className="text-analyzer">
      <textarea
        className="input-area"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
      />
      <div className="statistics">
        <p>Unique Words: {uniqueWordCount}</p>
        <p>Character Count (Excl. Spaces & Punctuation): {characterCount}</p>
      </div>
      <div className="replacement">
        <input
          type="text"
          placeholder="Find"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <input
          type="text"
          placeholder="Replace"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
        />
        <button onClick={handleReplace}>Replace All</button>
      </div>
      <div className="highlighted-text" dangerouslySetInnerHTML={renderTextWithHighlight()} />
    </div>
  );
};

export default TextAnalyzer;
