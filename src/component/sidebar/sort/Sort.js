import React,{useState,useEffect, useRef} from 'react'
import "./sort.css"
import rightarrow from "../../../assest/rightarrow.png"
import downarrow from "../../../assest/downarrow.png"

export default function Sort() {
  const[directionArrowAndData, setDirectionArrowAndData]= useState(false)
  const[selectOption, setSelectOption]= useState("Popularity Descending")
  const[isOpen, setIsOpen]= useState(false)
  const dropdownRef = useRef()

  const options =["Popularity Descending" , 
      "Popularity Ascending " , 
     " Rating Descending"  ,    
      "Rating Ascending " ,     
      "Release Date Descending",
     " Release Date Ascending ",
      "Title (A-Z)" ,           
      "Title (Z-A)" ,]


      function handelDetails() {
          setDirectionArrowAndData(!directionArrowAndData);
      }
  
      function handelOption() {
          setIsOpen(!isOpen);
      }
  
      function handleOptionClick(option) {
          setSelectOption(option);
          setIsOpen(false);
      }


      useEffect(()=>{

          function handleClickOutside(event){
                  if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                      setIsOpen(false)
                  }
              }
                  document.addEventListener("mousedown",handleClickOutside);
                  return()=>{
                      document.removeEventListener("mousedown",handleClickOutside)
                  }


      },[dropdownRef])

    


  return (
    <div className='sort'> 
      
       <div className='' onClick={handelDetails}> 
        <div className={directionArrowAndData ? "sort-details-active" : 'sort-details'}>

      <span className='sort-title' style={{fontWeight:"bold"}}>Sort</span> 

      <span className='arrow-container'>
      {directionArrowAndData ? <img src= {downarrow} width={14} height={14}/> :  <img src= {rightarrow} width={14} height={14}/>}
      </span>
        </div>
      </div> 

{/* more details of sort */}
{directionArrowAndData &&
        <div className= "sort-details2" >
            <p style={{color: "gray"}}>Sort Results By</p>
            <div className='sort-select-options' onClick={handelOption}
            >
                {selectOption} <img src={downarrow} width={14} height={14} style={{paddingTop: "5px"}} />
            </div>
            {isOpen && (
                <div className='options' ref={dropdownRef} >
                    {options.map(option => (
                        <div className='option-data' 
                            key={option} 
                        
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    }
    </div>
  )
}
