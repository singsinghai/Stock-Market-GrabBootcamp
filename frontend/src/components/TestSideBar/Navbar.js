import React, { useState } from 'react';
import {
  Icon, Text
} from '@chakra-ui/react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import SearchBar from './SearchBar';
import { act } from 'react-dom/test-utils';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation()
  let n = 0
  if (location.pathname.includes('company')){
    n = 1
  }
  if (location.pathname.includes('company-ranking')){
    n = 2
  }
  if (location.pathname.includes('xxx')){
    n = 3 
  }
  const [pageActive, setPageActive] = useState(n)
  const changePageActive = (e) => setPageActive(e)
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <div className='logo'>
            <Link to='/' onClick={() => changePageActive(0)}>
              <Text fontSize="42" fontFamily="GrabFont" color='#f5f5f5'>
                  HERCULÉ
              </Text>
            </Link>
          </div>
          <SearchBar/> 
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> 
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
            <div className='logo' >
              <Link to='/' onClick={() => changePageActive(0)}>
                <Text fontSize="42" fontFamily="GrabFont" color='#f5f5f5'>
                    HERCULÉ
                </Text>
              </Link>
            </div>
            </li>
            {SidebarData.map((item, index) => {
              let activeClass = ''
              if (index === pageActive){
                activeClass = ' live'
              }
              return (
                <li key={index} className={item.cName + activeClass} value={index} onClick={() => changePageActive(index)}>
                  <Link to={item.path}>
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={item.icon}
                    />
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
