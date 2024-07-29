import React, { useState, useEffect, useRef } from 'react';
import rightarrow from "../../../assest/rightarrow.png";
import downarrow from "../../../assest/downarrow.png";
import UnitedStates from "../../../assest/united-states.png";
import UnitedKingdom from "../../../assest/united-kingdom.png";
import Canada from "../../../assest/spain.png";
import Australia from "../../../assest/india.png";
import Providers from './Providers';
import "./whereToWatch.css";

export default function WhereToWatch() {
  const [directionArrowAndData, setDirectionArrowAndData] = useState(false);
  const [selectOption, setSelectOption] = useState("Country");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const countries = [
    { name: "United States", flag: UnitedStates },
    { name: "United Kingdom", flag: UnitedKingdom },
    { name: "Canada", flag: Canada },
    { name: "Australia", flag: Australia },
  ];

  const handleDetails = () => setDirectionArrowAndData(!directionArrowAndData);
  const handleOption = () => setIsOpen(!isOpen);
  const handleOptionClick = (option) => {
    setSelectOption(option.name);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className='whereToWatch'>
      <div onClick={handleDetails}>
        <div className={ directionArrowAndData ? 'whereToWatch-details-active' : 'whereToWatch-details'}>
          <span className='titel-whereToWatch' style={{ fontWeight: "bold" }}>Where To Watch</span>
          <span className='number-whereToWatch'>32</span>
          <span className='arrow-container'>
            <img src={directionArrowAndData ? downarrow : rightarrow} width={14} height={14} />
          </span>
        </div>
      </div>

      {directionArrowAndData && (
        <div className='whereToWatch-details2-container'>
          <div  className='whereToWatch-details2'>
            <p style={{ color: "gray", marginBottom: "2rem" }}>My Services</p>
            <div className='details-subtitle'>
              <input type='checkbox' /> <span>Restrict searches to my</span>
              <p>subscribed services?</p>
            </div>
          </div>

          <div className='country'>
            <p style={{ color: "gray", marginTop: "10px" }}>Country</p>
            <div className='selectOption' onClick={handleOption}>
              {selectOption} <img src={downarrow} width={14} height={14} style={{ paddingTop: "5px" }} />
            </div>
          </div>

          {isOpen && (
            <div ref={dropdownRef} style={{ backgroundColor: "white", position: "absolute", zIndex: 1, width: "220px", height: "200px", overflow: "scroll", borderRadius: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
              {countries.map(option => (
                <div className='option-data' key={option.name} onClick={() => handleOptionClick(option)}>
                  <img src={option.flag} width={20} height={20} style={{ marginRight: "10px" }} />
                  {option.name}
                </div>
              ))}
            </div>
          )}
            <Providers/>
        </div>
      )}
      
      
       

    </div>
  );
}
