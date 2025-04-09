import React from 'react';
//import './AboutUs.css';
import TopBar from './Navigation/TopBar';
import {useLocation} from "react-router-dom";
import backroundImage from "../assets/FAQ.jpg";

// View More Component welches die Beschreibung des unternehmens ausführlich darstellt. Diese Component ist mit der Sidebar
// des Dashboards verlinkt.

const CompanyViewMore = () => {
    // Zugriff auf die übergebene Unternehmensdaten aus der vorherigen Route
    const location = useLocation();
    const { companydata } = location.state;

    return (
        <div
            className="relative min-h-screen flex flex-col"
            style={{
                backgroundImage: `url(${backroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed", // Ensures the background extends with scrolling
            }}
        >
            <div className="absolute inset-0 bg-white/50">
                <TopBar currentPage="AboutUs"/>
            </div>

            {/* Hauptcontainer mit Inhalt */}
            <div className="relative p-10 text-[#333] mt-10 flex-grow"> {/* Added flex-grow to ensure full height */}
                <div className="about-us p-10 text-[#333] mt-1"> {/* Added margin-top */}

                    {/* Hauptinhalt: Unternehmensbeschreibung */}
                    <section
                    className="about-us-content bg-[#fff] p-10 rounded-lg overflow-auto max-w-4xl shadow-md m-auto">

                    {/* Unternehmensname und Beschreibung */}
                    <article>
                        <h1 className='text-4xl mb-[20px] text-[#222] text-center '>More About {companydata.name}</h1>
                        <p className='text-xl mb-[20px] leading-6 text-wrap text-center'>
                            {companydata.description}
                        </p>
                    </article>

                    {/* Unternehmensvision */}
                    <article>
                        <h2 className='text-3xl mt-[30px] text-[#555] text-center underline mb-2'>Our Vision</h2>
                        <p className='text-xl mb-[20px] leading-6 text-wrap'>
                            {companydata.vision}
                        </p>
                    </article>

                    {/* Unternehmenswerte */}
                    <section>
                        <h2 className='text-3xl mt-[30px] text-[#555] text-center underline mb-2'>Our Values</h2>
                        
                        {/* Iteration über die Unternehmenswerte und deren Darstellung */}
                        {companydata.our_values.map((data, index) => (
                            <section key={index}>
                                <ul>
                                    <li className="text-center"><p
                                        className='text-black font-bold text-balance text-center mt-1'>{data.title}</p>{data.description}
                                    </li>
                                </ul>
                            </section>
                        ))}
                    </section>
                </section>
            </div>
            </div>
        </div>

    );
};

export default CompanyViewMore;