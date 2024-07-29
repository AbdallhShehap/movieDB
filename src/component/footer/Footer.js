import React from "react";
import { Link} from "react-router-dom";
import "./footer.css";

export default function Footer() {
  const basics = [
    { title: "About TMDB", link: " " },
    { title: "Contact Us", link: " " },
    { title: "Support Forums", link: " " },
    { title: "System Status", link: " " },
  ];

  const getInvolved = [
    { title: "Contribution Bible", link: " " },
    { title: "Add New Movie", link: " " },
    { title: "Add New TV Show", link: " " },
  ];

  const community = [
    { title: "Guidelines", link: " " },
    { title: "Discussions", link: " " },
    { title: "Leaderboard", link: " " },
  ];

  const legal = [
    { title: "Terms of Use", link: " " },
    { title: "API Terms of Use", link: " " },
    { title: "Privacy Policy", link: " " },
    { title: "DMCA Policy", link: " " },
  ];

  const renderLinks = (section) => (
    <ul>
      {section.map((item, index) => (
        <li key={index} className="link-tag">
          <Link to={item.link} className="link" >
          {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="footer">
      <div className="footer-details">
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          width="130px"
          height="94px"
        />

            <div className="footer-link-container"> 

            <div className="footer-link">
          <h3>THE BASICS</h3>
          {(renderLinks(basics))}
        
        </div>

        
        <div className="footer-link">
          <h3>GET INVOLVED</h3>
          {(renderLinks(getInvolved))}

        </div>

        
        <div className="footer-link">
          <h3>COMMUNITY</h3>
          {(renderLinks(community))}

        </div>
        
        <div className="footer-link">
          <h3>LEGAL</h3>
          {(renderLinks(legal))}
        </div>


            </div>
       

      </div>
    </div>
  );
}
