import Hero from "./Hero";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AboutUs from "./AboutUs";
import Team from "./Team"
import FAQ  from "./FAQ";
import TopBar from "../components/Navigation/TopBar";
import {Lines} from "react-preloaders";


const Landingpage = () => {

    return (
        <div className="bg-[#151D48]">
            <TopBar currentPage="LandingPage"/>
            <Hero />
            <AboutUs />
            <Team/>
            <FAQ />
            <Footer />
        </div>
    );
}


export default Landingpage;