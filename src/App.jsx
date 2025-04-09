import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import LandingPage from "./Landingpage/Landingpage";
import DashboardFAQ from "./components/DashboardFAQ.jsx";
import CompanyViewMore from "./components/CompanyViewMore.jsx";



const App = () => {
 return (
   <Router>
   <Routes>
     <Route path="/" element={<LandingPage />} />
     <Route path="/dashboard" element={<Dashboard/>}/>
     <Route path="/DashboardFAQ" element={<DashboardFAQ/>}/>
     <Route path="/Company" element={<CompanyViewMore/>}></Route>
   </Routes>
 </Router>

 );
};

export default App;
