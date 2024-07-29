import React, { useState, useEffect, useContext } from 'react';
import "./keyword.css";
import { PageContext } from './context/PageContext';
import { KeywordsContext } from './context/KeywordContext';

export default function Keywords() {
  const [fillInput, setFillInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { keywords, setKeywords } = useContext(KeywordsContext);
  const { page, setPage } = useContext(PageContext);
  const [suggestedKeywords, setSuggestedKeywords] = useState([]);

  useEffect(() => {
    const fetchKeyword = async () => {
      const url = `https://api.themoviedb.org/3/search/keyword?query=${inputValue}&page=${page}`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDA2ZmI3MjM4ZTM0ZTlmMjU0NDllOWUxZmI2MmI1YyIsIm5iZiI6MTcyMDI4MDYxNC40MzQ2NjIsInN1YiI6IjY2ODk2MjFjMmY4MTM0NzI0Yjg5MDJjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RAAh0lm5trzy11W0Mj3kdDJ-mqnojivaEw0suodxvik'
        }
      };

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setSuggestedKeywords(data.results);
      } catch (error) {
        console.error('Error fetching keyword:', error);
      }
    };

    if (inputValue.trim()) {
      fetchKeyword();
    } else {
      setSuggestedKeywords([]);
    }
  }, [inputValue, page]);

  function handleKeywordChange(e) {
    setInputValue(e.target.value);
  }

  function handleKeywordSelect(keyword) {
    setKeywords([...keywords, keyword]);
    setInputValue('');
    setSuggestedKeywords([]);
  }

  function handleCheckInput() {
    setFillInput(!fillInput);
  }

  function handleRemoveKeyword(index) {
    setKeywords(keywords.filter((_, i) => i !== index));
  }

  return (
    <>
      <div className={fillInput ? "keyword-container-active" : "keywords-container"}>
        {keywords.map((keyword, index) => (
          <span key={index} className='keyword-tag'>
            {keyword.name} <button onClick={() => handleRemoveKeyword(index)}>x</button>
          </span>
        ))}
        <input
          type='text'
          className={fillInput ? 'search-keywords-active' : 'search-keywords'}
          placeholder='Filter by Keywords...'
          onClick={handleCheckInput}
          value={inputValue}
          onChange={handleKeywordChange}
        />
        {suggestedKeywords.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestedKeywords.map((keyword) => (
              <div key={keyword.id} onClick={() => handleKeywordSelect(keyword)}>
                {keyword.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
