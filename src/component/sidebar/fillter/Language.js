import React, { useState, useEffect, useRef, useContext } from 'react';
import { LanguageContext } from './context/languageContext';
import quesmark from "../../../assest/question.png";
import downarrow from "../../../assest/downarrow.png";
import "./language.css";

export default function Language() {
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  const [directionArrowAndData, setDirectionArrowAndData] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [selectOption, setSelectOption] = useState("None Selected");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      const storedLanguageName = localStorage.getItem('selectedLanguageName');
      setSelectOption(storedLanguageName || "None Selected");
    }
  }, [setSelectedLanguage]);

  function handelDetails() {
    setDirectionArrowAndData(!directionArrowAndData);
  }

  function handelOption() {
    setIsOpen(!isOpen);
  }

  function handleOptionClick(english_name, iso_639_1) {
    localStorage.setItem('selectedLanguage', iso_639_1);
    localStorage.setItem('selectedLanguageName', english_name);
    setSelectOption(english_name);
    setIsOpen(false);
    setSelectedLanguage(iso_639_1);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const fetchLanguageData = async () => {
      const url = 'https://api.themoviedb.org/3/configuration/languages';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDA2ZmI3MjM4ZTM0ZTlmMjU0NDllOWUxZmI2MmI1YyIsIm5iZiI6MTcyMDI4MDYxNC40MzQ2NjIsInN1YiI6IjY2ODk2MjFjMmY4MTM0NzI0Yjg5MDJjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RAAh0lm5trzy11W0Mj3kdDJ-mqnojivaEw0suodxvik'
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const languageData = data.map(language => ({
          iso_639_1: language.iso_639_1,
          english_name: language.english_name,
          name: language.name
        }));
        setLanguages(languageData);
      } catch (err) {
        console.error('Error fetching LanguageData:', err);
      }
    };

    fetchLanguageData();
  }, []);

  return (
    <div className="language">
      <div className="language-title" onClick={handelDetails}>
        <p style={{ color: "gray" }}>
          Language <img src={quesmark} style={{ cursor: "pointer" }} />
        </p>
        <div className='language-overlay'>
          <div className="language-note">Filter items based on their original language.</div>
        </div>
      </div>

      <div className="language-details2">
        <div className='language-select-options' onClick={handelOption}>
          {selectOption} <img src={downarrow} width={14} height={14} style={{ paddingTop: "5px" }} />
        </div>
        {isOpen && (
          <div className='language-options' ref={dropdownRef}>
            {languages.map(option => (
              <div className='language-option-data'
                key={option.iso_639_1}
                onClick={() => handleOptionClick(option.english_name, option.iso_639_1)}
              >
                {option.english_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
