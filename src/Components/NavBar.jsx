import React, { useState, useEffect } from 'react';
import logo from '../assets/Ecomm_logo.webp';
import { AiFillCaretDown, AiFillCaretUp, AiOutlineSearch } from "react-icons/ai";

const NavBar = () => {
  const [moreClicked, setMoreClicked] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const options = ['HOME', 'ELECTRONICS', 'BOOKS', 'MUSIC', 'CLOTHING', 'GAMES'];
  const [optionListLength, setOptionListLength] = useState(7);



  useEffect(() => {

  
    window.addEventListener('resize', function() {
      setWindowWidth(window.innerWidth)
    });
    getNavOptions();
    console.log(windowWidth)
  }); // Empty dependency array ensures that this effect runs only once on mount

  


  const getNavOptions = () => {
    if (windowWidth <= 425){
      setOptionListLength(0);
    }else if (windowWidth <= 768) {
      console.log('Match');
      setOptionListLength(1);
    } else if (windowWidth <= 1038){
      setOptionListLength(3);
    } else {
      setOptionListLength(7);
    }
  };

  const handleDropDown = () => {
    setMoreClicked(!moreClicked);
  };

  return (
    <div className='w-100%'>
      <nav className='flex bg-black items-center justify-between h-16 w-100%'>
        <img className='bg-white h-12 p-2 mx-2 rounded-[15px]' src={logo} alt="Failed to Load" />

        <div className='p-2 flex'>
          {options.slice(0,optionListLength).map((key, index) => (
            <button key={index} className='text-white mx-4 hover:text-blue-300'>{key}</button>
          ))}

          <button className={`text-white mx-4 flex items-center hover:text-blue-300 ${!moreClicked ? `text-blue-300` : null}`}
            onClick={handleDropDown}
          >
            <p className='mr-1'>MORE</p>
            <div>
              {moreClicked ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </div>
          </button>
          {windowWidth > 560 ?
            <div className='items-center'>
              <div className='flex'>
                <button className='text-white mr-2'>
                  <AiOutlineSearch />
                </button>
                <input
                  className='bg-black text-white'
                  type="search"
                  placeholder='Search Something...'
                />
              </div>
              <hr />
            </div>
            : 
            <div className='flex justify-center items-center'>
              <button className='text-white text-bold mr-2'>
                <AiOutlineSearch />
              </button>
            </div>
          }
        </div>
      </nav>
      {!moreClicked ?
        <div className={`absolute ${windowWidth <= 426 ? `right-6`: `right-48`} flex-col bg-black w-32 justify-center py-2 rounded-md mt-1`}>
          {
            options.slice(optionListLength,7).map((key,index) => (
              <button className='text-white w-full flex justify-center hover:bg-gray-200 hover:text-black'>{key}</button>
            ))
          }
          <button className='text-white w-full flex justify-center hover:bg-gray-200 hover:text-black'>HELP</button>
          <button className='text-white w-full flex justify-center hover:bg-gray-200 hover:text-black'>ABOUT</button>
        </div>
        : null
      }
    </div>
  );
};

export default NavBar;
