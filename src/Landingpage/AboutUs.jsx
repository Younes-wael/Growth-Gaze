import React from 'react';
import Laptop from '../assets/rb_1434.png';
const AboutUs = () => {
  return (
    <div id="aboutus" className='w-full  py-6 px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Laptop} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>KEY-PERFORMANCE-INDICATOR DASHBOARD</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 '>View Startup Insights Centrally</h1>
          {/* Beschreibung für die Sektion */}
          <p className=''>
            Key Performance Indicators (KPIs) are critical metrics that measure a startup's performance and
            growth potential. They provide valuable insights into aspects like revenue growth, market size, and
            sustainability, helping investors make informed decisions. Our dashboard simplifies complex KPIs,
            empowering you to compare and evaluate startups with ease.
          </p>

          {/* Externer Link zu einem weiterführenden Artikel über KPIs */}
          <a href="https://www.investopedia.com/terms/k/kpi.asp#toc-what-are-key-performance-indicators-kpis"
             target="_blank" rel="noopener noreferrer">
            <button
                className='bg-[#00df9a] text-[#151D48] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Learn
              more
            </button>
          </a></div>
      </div>
    </div>
  );
};

export default AboutUs;