import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logo from "/Logo/GGlogo.png";
import { Link, useNavigate } from "react-router-dom";

// Die TopBar-Komponente erhält die aktuelle Seite als Prop
const TopBar = ({ currentPage }) => {
    const [nav, setNav] = useState(false); //Zustand für das mobile Navigationsmenü
    const navigate = useNavigate(); // React Router Hook für Navigation

    // Funktion zum Umschalten des Navigationsmenüs (öffnen/schließen)
    const handleNav = () => {
        setNav(!nav);
    };

    // Funktion zur Navigation basierend auf der aktuellen Seite
    const handleGoBack = () => {
        if (currentPage === "MainPage") {
            navigate("/"); // Zur Startseite navigieren
        } else if (currentPage === "FAQPage") {
            navigate("/dashboard"); // Zur Hauptseite navigieren
        }
        else if (currentPage === "AboutUs") {
            navigate("/dashboard"); 
        }
    };

    return (
        // Container für die TopBar mit dynamischer Anpassung des Layouts
        <div className={`topbar bg-white shadow-md flex items-center justify-${currentPage === 'LandingPage' ? 'center' : 'between'} px-8 py-3 relative`}>
            {currentPage === 'LandingPage' ? (
                <img src={logo} alt="Growth Gaze Logo" className="h-14" />
            ) : (
                <>
                    {/* Link zum Logo und Name */}
                    <div className="flex items-center space-x-4">
                        <Link to="/">
                            <img src={logo} alt="Growth Gaze Logo" className="h-14" />
                        </Link>
                        <span className="text-xl font-bold text-gray-800">
                            <Link to="/">Growth Gaze</Link>
                        </span>
                    </div>

                    {/* Zurück-Button, sichtbar auf größeren Bildschirmen */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button
                            onClick={handleGoBack}
                            className="bg-[#00df9a] text-[#151D48] px-4 py-2 rounded hover:bg-black-600 transition"
                        >
                            Go Back
                        </button>
                    </div>

                    {/* Icon für das mobile Menü */}
                    <div className="md:hidden" onClick={handleNav}>
                        {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                    </div>

                    {/* Mobiles Menü (wird bei Klick auf das Icon eingeblendet) */}
                    <div
                        className={
                            nav
                                ? "fixed left-0 top-0 w-[60%] h-full bg-white shadow-lg ease-in-out duration-500 z-10"
                                : "fixed left-[-100%] top-0 w-[60%] h-full bg-white shadow-lg ease-in-out duration-500 z-10"
                        }
                    >
                        {/* Menü-Kopf mit Logo und Titel */}
                        <div className="p-4 border-b border-gray-200 flex items-center space-x-4">
                            <img src={logo} alt="Growth Gaze Logo" className="h-12" />
                            <span className="text-lg font-bold text-gray-800">
                                <Link to="/">Growth Gaze</Link>
                            </span>
                        </div>

                        {/* Menü-Links */}
                        <ul className="p-4 space-y-4">
                            <li className="text-gray-800 hover:text-indigo-500">
                                <Link to="/">Landing Page</Link>
                            </li>
                            {currentPage !== "MainPage" && (
                            <li className="text-gray-800 hover:text-indigo-500">
                                <Link to="/dashboard">Main Page</Link>
                            </li>
                            )}
                            {currentPage !== "FAQPage" && (
                                <li className="text-gray-800 hover:text-indigo-500">
                                    <Link to="/DashboardFAQ">FAQ</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

// PropTypes zur Typprüfung der Props
TopBar.propTypes = {
    currentPage: PropTypes.string.isRequired,
};

export default TopBar;
