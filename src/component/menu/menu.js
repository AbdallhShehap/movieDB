import React from 'react'
import "./menu.css"
import { useState } from 'react'
import serchIcon from '../../assest/search.png'
import plusIcon from '../../assest/plus-icon.png'
import translateIcon from '../../assest/translate-icon.png'
import notificationIcon from '../../assest/notification.png'
import hamburgerMenu from '../../assest/hamburger-menu.png'
import mail from '../../assest/mail.png'
 
export default function Menu() {

  const [visibleDropdown, setVisibleDropdown] = useState(null);


  const menuItems = {
    Movies: ['Popular', 'Now Playing', 'Upcoming', 'Top Rated'],
    TVShows: ['Popular', 'Airing Today', 'On TV', 'Top Rated'],
    People: ['Popular People'],
    More: ['Discussions', 'Leaderboard', 'Support', 'API']
  };


function handleMouseEnter(menu){
  console.log("mouse enter")
  setVisibleDropdown(menu)
}

function handleMouseLeave(){
  console.log("mouse enter")

setVisibleDropdown(null)
}


  return (
    <header>
      <div className='menu'>
        <div className='content-menu'>

        {/* lift-menu */}

          <div className='lift-menu'>

          <img src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg' alt='logo' height="20" width="154"  / >

          


<ul className="menu-tab">
              {Object.keys(menuItems).map((menu) => (
                <li
                  key={menu}
                  onMouseEnter={() => handleMouseEnter(menu)}
                  onMouseLeave={handleMouseLeave}
                >
                  {menu}
                  {visibleDropdown === menu && (
                    <div className="dropdown-menu">
                    {console.log("the name of menu item ",menuItems[menu])}
                      <ul>
                        {menuItems[menu].map((item, index) => (
                          <li key={index} style={{ color: 'black', fontWeight:"normal" }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>

          </div>


          {/* right-menu */}
          <div className='right-menu'>
        

          <ul className='icon-menu'>
              <li><img src={plusIcon}  alt='icon' width={22} height={22}/></li>
              <li><img src={translateIcon}  alt='icon' wwidth={23} height={23} /></li>
              <li><img src={notificationIcon}  alt='icon' width={23} height={23} /></li>
              <li><img src={mail}  alt='icon'  width={25} height={25}/></li>
              <li><img src={serchIcon} alt='icon' width={25} height={25}/></li>
            
            </ul>


          </div>

          {/* hamburger menu  */}

           
          <div className='hamburger-menu'>
            <img src={hamburgerMenu} />
          </div>
        </div>
      </div>
    </header>
  )
}