import React from 'react';
import {ReactTyped} from 'react-typed';
import videoBg from "/background-video.mov"
import "./landingpage.css";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <div id="main" >

      {/* Hintergrundvideo für den Hero-Bereich */}
      <video className='object-cover w-full h-screen object-left' src={videoBg} autoPlay loop muted />

      <div className='w-full h-full absolute top-20 left-0 bg-white/50'>
        <div className='m-auto h-screen w-full flex flex-col justify-center  items-center'>
            <h1 className='text-[#151D48] md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
              Growth Gaze.
            </h1>

          {/* Dynamischer Textbereich mit animierter Typing-Effekt */}
          <div className='flex justify-center items-center'>
            <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
              Fast, flexible Dashboard for
            </p>
            <ReactTyped
            className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
              strings={['Investing', 'Learning', 'Inform', 'Teaching']}
              typeSpeed={120}
              backSpeed={140}
              loop
            /> 
          </div>

          {/* Beschreibung des Angebots */}
          <p className='md:text-2xl text-xl font-bold text-gray-500'>View interactive KPI data from over 20+ different Startups and bring your investing to the next level</p>
          <button className='bg-[#00df9a] w-[200px] rounded-md font-bold my-6 mx-auto py-3 text-[#151D48]'><Link to="/dashboard">Get Started</Link></button>
        </div>
      </div>


    </div>

  );
};

export default Hero;

