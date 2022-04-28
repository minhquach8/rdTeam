import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import "./NavBar.css";


const Navbar = (props) => {
  
  const handleClick = () => props.setClick(!props.click);


  return (
      <>
      <nav className="navbar">
      <div className="nav-container">
    <ul className={props.click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                MARKET
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/favorite"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                FAVORITE
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/reminder"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                REMINDER
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={props.click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          </div>
          </nav>
          </>
  )
}

export default Navbar;