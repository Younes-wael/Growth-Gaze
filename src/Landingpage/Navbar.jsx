import React, { useState } from 'react';
import GrowthGaze from '/Logo/growthgaze.png';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>

      {/* Logo/Branding der Seite */}
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>GrowthGaze</h1>
      

      {/* Desktop-Navigationsmenü (sichtbar nur auf mittleren & großen Bildschirmen) */}
      <ul className='hidden md:flex '>
        <li className='p-4'><a href='#main'>Home</a></li>
        <li className='p-4'><a href='#aboutus'>About</a></li>
        <li className='p-4'><a href='#team'></a>Team</li>
      </ul>

      {/* Button für das mobile Menü (nur sichtbar auf kleinen Bildschirmen) */}
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobiles Menü (sichtbar, wenn "nav" true ist) */}
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>

        {/* Überschrift für das mobile Menü */}
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>
        
          {/* Menüeinträge */}
          <li className='p-4 border-b border-gray-600'>Home</li>
          <li className='p-4 border-b border-gray-600'>About</li>
          <li className='p-4'>Team</li>
      </ul>
    </div>
  );
};

export default Navbar;