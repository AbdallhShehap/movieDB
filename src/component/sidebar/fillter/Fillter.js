import React,{useState, useRef, useEffect} from 'react'
import rightarrow from "../../../assest/rightarrow.png"
import downarrow from "../../../assest/downarrow.png"
import UnitedStates from "../../../assest/united-states.png";
import UnitedKingdom from "../../../assest/united-kingdom.png";
import Canada from "../../../assest/spain.png";
import Australia from "../../../assest/india.png";
import DateForm from "./DateForm";
import Genres from "./Genres";
import Language from "./Language";
import UserScore from "./UserScore";
import Keywords from "./Keywords";
import './DateRangePicker.css';
import "./fillter.css"

export default function Fillter() {

    const[directionArrowAndData, setDirectionArrowAndData]= useState(false)

    const[ checkedAvailabilities, setCheckedAvailabilities]= useState({
      checkedAvailabilities: true,
      stream: true,
      free: true,
      ads: true,
      rent: true,
      buy: true,
    })

    const[ checkedReleaseDates, setCheckedReleaseDates]= useState({
      checkedReleaseDates: true,
      searchAllCountries: true,
      theatricalLimited: true,
      theatrical: true,
      premiere: true,
      digital: true,
      physical: true,
      tv: true
    })

    const [selectOption, setSelectOption] = useState("Country");
    const [isOpen, setIsOpen] = useState(false);

    const handleOption = () => setIsOpen(!isOpen);


    const dropdownRef = useRef();

    const countries = [
      { name: "United States", flag: UnitedStates },
      { name: "United Kingdom", flag: UnitedKingdom },
      { name: "Canada", flag: Canada },
      { name: "Australia", flag: Australia },
    ];


    const handleOptionClick = (option) => {
      setSelectOption(option.name);
      setIsOpen(false);
    }



    function handelDetails() {
      localStorage.setItem('statesFillter',JSON.stringify(!directionArrowAndData))
      setDirectionArrowAndData(!directionArrowAndData);
    }


    useEffect (()=>{
        const statesFillter = JSON.parse(localStorage.getItem('statesFillter'));

        setDirectionArrowAndData(statesFillter)

    },[])


    function handelCheckedAvailabilities(e) {
      const { name, checked } = e.target;
      if(name === "checkedAvailabilities" && checked === true){
        setCheckedAvailabilities(
      {checkedAvailabilities: true,
      stream: true,
      free: true,
      ads: true,
      rent: true,
      buy: true,})
      
    }else{

      setCheckedAvailabilities((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    }

    }


    function handelCheckedReleaseDates(e) {
      const { name, checked } = e.target;
      if(name === "checkedReleaseDates" && checked === true){
        setCheckedReleaseDates(
      { checkedReleaseDates: true,
        theatricalLimited: true,
        theatrical: true,
        premiere: true,
        digital: true,
        physical: true,
        tv: true})
      
    }else{

      setCheckedReleaseDates((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    }

    }


  return (
    <div className='fillter-comp'>
      
      <div className='' onClick={handelDetails}> 
        <div className={ directionArrowAndData ? 'fillter-details-active' : 'fillter-details'}>

      <span style={{fontWeight:"bold"}}>Fillter</span> 

      <span className='arrow-container'>
      {directionArrowAndData ? <img src= {downarrow} width={14} height={14}/> :  <img src= {rightarrow} width={14} height={14}/>}
      </span>
        </div>
      </div> 

      {/* more details of the fillter  */}
      {directionArrowAndData && 

        <div className={directionArrowAndData ? "fillter-details2-container-active" : 'fillter-details2-container'}>
          <div className='fillter-details2'>
            <p style={{ color: "gray", marginBottom: "0.5rem",padding:"14px 9px 6px" }}>Show Me</p>

            <div className='fillter-details-subtitle'>

             <div className='show-me'>

             <div className='is-have-seen'>
              
             <input id="everything" name="everything" type="radio" style={{ width: "12px", height: "12px",cursor: "pointer" }} />
               
                <label  style={{paddingLeft:"6px"}} htmlFor='everything'>Everything</label>
             </div>
             
             <div className='is-have-seen'>
              
             <input id="no-have" name="no-have" type="radio" style={{ width: "12px", height: "12px",cursor: "pointer" }} />
               
                <label  style={{paddingLeft:"6px"}} htmlFor='no-have'>Movies I Haven't Seen</label>
                
             </div>
             
             <div className='is-have-seen'>
              
             <input id="have" name="have" type="radio" style={{ width: "12px", height: "12px",cursor: "pointer" }} />
               
               <label  style={{paddingLeft:"6px"}} htmlFor='have'>Movies I Haven Seen</label>

             </div>
             
             </div>

             <div className='Availabilities'>

             <p style={{ color: "gray",padding:"14px 9px 0px" }}>Availabilities</p>

             <div className='all-Availabilities'>
              
             <input   id="Availabilities"
                    name="checkedAvailabilities"
                    type="checkbox"
                    checked={checkedAvailabilities.checkedAvailabilities}
                    onChange={handelCheckedAvailabilities}
                    style={{ width: "16px", height: "16px",cursor: "pointer" }} />
             
               
                <label  style={{paddingLeft:"6px", paddingBottom:"8px",fontSize:"16px" }} htmlFor='Availabilities'>Search all availabilities?</label>

                {!checkedAvailabilities.checkedAvailabilities && 
             <>
              <div className='list-availabilities'>
              
              <input id="Stream" name="stream" type="checkbox" checked={checkedAvailabilities.stream}  onChange={handelCheckedAvailabilities} style={{ width: "16px", height: "16px",cursor: "pointer" }} />
          
               
               <label  style={{paddingLeft:"6px", paddingBottom:"8px",fontSize:"16px" }} htmlFor='Stream'>Stream</label>
                 
              </div>
              
              <div className='list-availabilities'>
              
              <input id="Free" name="free" type="checkbox" checked={ checkedAvailabilities.free } onChange={handelCheckedAvailabilities} style={{ width: "16px", height: "16px" ,cursor: "pointer"}} />
               
               <label  style={{paddingLeft:"6px", paddingBottom:"8px",fontSize:"16px" }} htmlFor='Free'>Free</label>
                 
              </div>
              
              <div className='list-availabilities'>
              
              <input id="Ads" name="ads" type="checkbox" checked={checkedAvailabilities.ads} onChange={ handelCheckedAvailabilities} style={{ width: "16px", height: "16px",cursor: "pointer" }} />
               
               <label  style={{paddingLeft:"6px", paddingBottom:"8px",fontSize:"16px" }} htmlFor='Ads'>Ads</label>
                 
              </div>
              
              
              <div className='list-availabilities'>
              
              <input id="Rent" name="rent" type="checkbox" checked={ checkedAvailabilities.rent } onChange={handelCheckedAvailabilities} style={{ width: "16px", height: "16px",cursor: "pointer" }} />
               
               <label  style={{paddingLeft:"6px", paddingBottom:"8px",fontSize:"16px" }} htmlFor='Rent'>Rent</label>
                 
              </div>
              
              <div className='list-availabilities'>
              
              <input id="Buy" name="buy" type="checkbox" checked={ checkedAvailabilities.buy } onChange={handelCheckedAvailabilities} style={{ width: "16px", height: "16px" ,cursor: "pointer"}} />
               
               <label  style={{paddingLeft:"6px", paddingBottom:"8px",fontSize:"16px" }} htmlFor='Buy'>Buy</label>
                 
              </div>
              

             </>
             }

             </div>
            
         
             
             </div>
             

             <div className='release-datess'>

             <p style={{ color: "gray",padding:"14px 9px 0px" }}>Release Dates </p>

             <div className='all-release-dates'>
              
             <input   id="releaseDatess"
                    name="checkedReleaseDates"
                    type="checkbox"
                    checked={checkedReleaseDates.checkedReleaseDates}
                    onChange={handelCheckedReleaseDates}
                    style={{ width: "16px", height: "16px",cursor: "pointer" }} />
             
               
                <label  style={{paddingLeft:"6px",fontSize:"16px" }} htmlFor='releaseDatess'>Search all releases?</label>

                {!checkedReleaseDates.checkedReleaseDates && 
             <>

              <div className='list-release-dates'>
              
              <input id="searchAllCountries" name="searchAllCountries" type="checkbox" checked={checkedReleaseDates.searchAllCountries}  onChange={handelCheckedReleaseDates} style={{ width: "16px", height: "16px" ,cursor: "pointer"}} />
          
               
               <label  style={{paddingLeft:"6px", paddingBottom:"0px",fontSize:"16px" }} htmlFor='searchAllCountries'>Search all countries?</label>
                 
              </div>

              {/* Release Dates Countries */}
              {!checkedReleaseDates.searchAllCountries  &&

              <>


        <div className='release-dates-country'>
            <div className='release-dates-selectOption' onClick={handleOption}>
              {selectOption} <img src={downarrow} width={14} height={14} style={{ paddingTop: "5px" }} />
            </div>
          </div>

          {isOpen && (
            <div ref={dropdownRef} style={{ backgroundColor: "white", position: "absolute", zIndex: 1, width: "220px", height: "200px", overflow: "scroll", borderRadius: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
              {countries.map(option => (
                <div className='release-dates-option-data' key={option.name} onClick={() => handleOptionClick(option)}>
                  <img src={option.flag} width={20} height={20} style={{ marginRight: "10px" }} />
                  {option.name}
                </div>
              ))}
            </div>
          )}
              </> 
              
              } 
                  


              <div className='list-release-dates'>
              
              <input id="theatricalLimited" name="theatricalLimited" type="checkbox" checked={checkedReleaseDates.theatricalLimited}  onChange={handelCheckedReleaseDates} style={{ width: "16px", height: "16px" ,cursor: "pointer"}} />
          
               
               <label  style={{paddingLeft:"6px",fontSize:"16px" }} htmlFor='theatricalLimited'>Theatrical (Limited)</label>
                 
              </div>

              <div className='list-release-dates'>
              
              <input id="theatrical" name="theatrical" type="checkbox" checked={checkedReleaseDates.theatrical}  onChange={handelCheckedReleaseDates} style={{ width: "16px", height: "16px",cursor: "pointer" }} />
          
               
               <label  style={{paddingLeft:"6px",fontSize:"16px" }} htmlFor='theatricalLimited'>Theatrical</label>
                 
              </div>
              

              <div className='list-release-dates'>
              
              <input id="premiere" name="premiere" type="checkbox" checked={checkedReleaseDates.premiere}  onChange={handelCheckedReleaseDates} style={{ width: "16px", height: "16px" ,cursor: "pointer"}} />
          
               
               <label  style={{paddingLeft:"6px",fontSize:"16px" }} htmlFor='premiere'>Premiere</label>
                 
              </div>
              

              <div className='list-release-dates'>
              
              <input id="digital" name="digital" type="checkbox" checked={checkedReleaseDates.digital}  onChange={handelCheckedReleaseDates} style={{ width: "16px", height: "16px" ,cursor: "pointer"}} />
          
               
               <label  style={{paddingLeft:"6px",fontSize:"16px" }} htmlFor='digital'>Digital</label>
                 
              </div>
              

              <div className='list-release-dates'>
              
              <input id="physical" name="physical" type="checkbox" checked={checkedReleaseDates.physical}  onChange={handelCheckedReleaseDates} style={{ width: "16px", height: "16px",cursor: "pointer" }} />
          
               
               <label  style={{paddingLeft:"6px",fontSize:"16px" }} htmlFor='physical'>Physical</label>
                 
              </div>
              

              <div className='list-release-dates'>
              
              <input id="tv" name="tv" type="checkbox" checked={checkedReleaseDates.tv}  onChange={handelCheckedReleaseDates} style={{ width: "16px", height: "16px",cursor: "pointer" }} />
          
               
               <label  style={{paddingLeft:"6px", paddingBottom:"8px",fontSize:"16px" }} htmlFor='tv'>TV</label>
                 
              </div>
             </>
             }

             
             <div>
              <DateForm/>
             </div>
            
            
             </div>
            
             
             
             </div>
             
              
             {/* Genres */}

              <Genres/>
              
             {/* Certification */}
             <div className='certification'>
             <p style={{ color: "gray" }}>Certification</p>
             </div>

               {/* Genres */}

               <Language/>

             {/* User Score  */}
             <div className='user-score'>

             <div className='title-user-score'>
             <p style={{ color: "gray" }}>User Score </p>
             </div>
       
             <UserScore/>
             </div>

             {/* Minimum User Votes  */}
             <div className='user-score'>

             <div className='title-user-score'>
             <p style={{ color: "gray" }}>User Score </p>
             </div>
       
             <UserScore/>
             </div>

             {/* Runtime  */}
             <div className='user-score'>

             <div className='title-user-score'>
             <p style={{ color: "gray" }}>User Score </p>
             </div>
       
             <UserScore/>
             </div>

             {/* Keywords  */}
             <div className='keywords'>

             <div className='title-keywords'>
             <p style={{ color: "gray" }}>Keywords </p>
             </div>
       
             <Keywords/>
             </div>



            </div>
          </div>
         </div>

        }
    </div>
  )
}
