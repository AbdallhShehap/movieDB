import React,{useState,useEffect} from 'react'
import checked from "../../../assest/check.png";
import "./providers.css"


export default function Providers() {
  const [clickedProvider, setClickedProvider] = useState([]);
  const [providers, setProviders] = useState([]);


  useEffect(()=>{

    const fetchProviders  = async ()=>{

      const url = 'https://api.themoviedb.org/3/watch/providers/movie?language=en-US';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDA2ZmI3MjM4ZTM0ZTlmMjU0NDllOWUxZmI2MmI1YyIsIm5iZiI6MTcyMDI4MDYxNC40MzQ2NjIsInN1YiI6IjY2ODk2MjFjMmY4MTM0NzI0Yjg5MDJjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RAAh0lm5trzy11W0Mj3kdDJ-mqnojivaEw0suodxvik'
        }
      };
      try {
        fetch(url, options)
              .then(res => res.json())
              .then(data => {
                const providerData = data.results.map(provider => ({
                  name: provider.provider_name,
                  src: `https://image.tmdb.org/t/p/original${provider.logo_path}`
        
      }));
      console.log("dsajxnkl",data)
      setProviders(providerData);
              })} catch (err) {
      console.error('Error fetching providers:', err);
    }
  };

  fetchProviders();
}, []);

  

  const handleProviderClick = (name) => {
    if(clickedProvider.includes(name)){
            setClickedProvider(clickedProvider.filter(provider=> provider !== name))
    }else{

      setClickedProvider([...clickedProvider,name]);
    }
  };



  return (
    <div className='providers-data'>

{providers.slice(0,28).map(option => (
                <div  key={option.name} className='provider-name'  onClick={() => handleProviderClick(option.name)} >
                  <img src={option.src} width={42.5} height={50} style={{ marginRight: "10px", marginTop:"5px",borderRadius:"5px" }} />
                  
                  <div className={`first-overlay ${clickedProvider.includes(option.name) ? 'active' : ''}`}>

                     <div className='checked-option'> <img src={checked} width={30} height={30}/> 
                     </div>

                  </div>
                  
                  <div className='secound-overlay' >

                  <div className='name-option'> {option.name} </div>
                  </div>

                </div>
              ))}

    </div>
  )
}
