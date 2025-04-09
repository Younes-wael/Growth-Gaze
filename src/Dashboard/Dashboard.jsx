import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Navigation/Sidebar";
import SalesSummary from "../components/Charts/SalesSummary";
import TargetVsRealityChart from "../components/Charts/TargetVsRealityChart";
import TopProductsChart from "../components/Charts/TopProducts";
import VisitorInsightsChart from "../components/Charts/VisitorInsightsChart";
import VolumeVsServiceLevelChart from "../components/Charts/VolumeVsServiceLevelChart";
import CustomerSatisfactionChart from "../components/Charts/CustomerSatisfactionChart";
import TotalRevenueChart from "../components/Charts/TotalRevenueChart";
import RiskExposureGauge from "../components/Charts/RiskExposureGauge";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Steps } from "intro.js-react";
import "intro.js/introjs.css";
import {Lines} from "react-preloaders";
import DraggableChart  from "../components/Charts/DraggableChart";

import TopBar from "../components/Navigation/TopBar";


const chartComponents = {
  TotalRevenueChart,
  CustomerSatisfactionChart,
  TargetVsRealityChart,
  VolumeVsServiceLevelChart,
  RiskExposureGauge,
  TopProductsChart
};



const Dashboard = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setPreloader] = useState(true);
  const [selectedCharts, setSelectedCharts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [introEnabled, setIntroEnabled] = useState(false);
  const [steps] = useState([
    {
      element:".root",
      title: "Welcome!",
      intro: "Welcome to the GrowthGaze KPI Dashboard. This short intro will show you around the dashboard so you know exactly how to work with it.",
      postion:"right"
    },
    {
      element: ".sidebar",
      intro: "In the Sidebar you can search for Companys and see key informations to the selected Company."
    },
    {
      element: ".static-charts",
      intro: "These Charts are fixed and show you the Startup performance over the past year."
    },
    {
      element: ".chart-grid",
      intro: "In den Chart section you can find your selected chart overview. With the move button you can drag and drop the chart where ever you like. With the red close button you close the chart."
    },
    
    {
      element: ".add-chart-button",
      intro: "Click here if you would like to change a chart or select a new one. You can select up to 3 Charts at a time."
    }, 
    {
      element: ".topbar",
      intro: "To leave the Dashboard just click on the go back button on or on our GrowthGaze Logo."
    }
  ]);


  const introOptions = {
    showProgress: false,
    exitOnOverlayClick: true,
    showButtons: true,
    doneLabel: 'Done',
  }


  const getCookie = (name) =>{
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? match[1] : null;
  }
    // Wenn das Cookie gesetzt ist return False
  const isIntroEnabled = () => {
    if(getCookie("introSeen") != null){
      return false; 
    }
    return true; 
  }

  useEffect(() => {
    const timer = setTimeout(()=>{
      setPreloader(false);
    }, 1500)


    if(isIntroEnabled()){
      document.cookie = `introSeen=true;max-age=604800;path=/`;
      setIntroEnabled(true);
      
    }
  
  }, []);

  // PreLoader wird gesetzt
  if(loading){
    return (
        <Lines/>
    );
  }


  const handleIntroExit = () =>{
    //setIntroEnabled(false);
    return; 
  }


  const togglePopup = () => {
    setIntroEnabled(false);
    setShowPopup(!showPopup);
  };


  const handleChartSelection = (chart) => {
    if (selectedCharts.includes(chart) || selectedCharts.length >= 6) return;
    setSelectedCharts([...selectedCharts, chart]);
  };


  const handleChartRemoval = (chart) => {
    if (selectedCharts.length > 0) {
      setSelectedCharts(selectedCharts.filter((c) => c !== chart));
    }
  };


  // Verschiebt den ausgewählten Chart zum mitgelieferten Index 
  const moveChart = (fromIndex, toIndex) => {
    const updatedCharts = [...selectedCharts];
    const [movedChart] = updatedCharts.splice(fromIndex, 1);
    updatedCharts.splice(toIndex, 0, movedChart);
    setSelectedCharts(updatedCharts);
  };



  return (
    <div className="flex h-screen flex-col main">
    {/* Add TopBar */}
    <TopBar currentPage="MainPage" className="topbar" />
    <Steps
      enabled={ introEnabled }
      steps={steps}
      initialStep={0}
      onExit={() => handleIntroExit()}
      options={introOptions}
    />


    <div className="flex flex-1 overflow-y-auto">
      <Sidebar
          setSelectedCompany={setSelectedCompany}
      />

      <div className="flex-1 p-4 ">
        {selectedCompany && (
            <>
            <section className="flex static-charts">
              <div className="flex-1 bg-white p-4 rounded-lg shadow-lg mb-4" >
                <SalesSummary companyData={selectedCompany} />
              </div>

              <div className="flex-1 bg-white p-2 rounded-lg shadow-lg mb-4" >
                <VisitorInsightsChart companyData={selectedCompany} />
              </div>
            </section>

              <DndProvider backend={HTML5Backend}>
                <div className="chart-grid grid grid-cols-1 sm:grid-cols-3  gap-4 p-4">
                  {selectedCharts.map((chart, index) => (
                      <DraggableChart
                          key={chart}
                          chart={chart}
                          index={index}
                          removeChart={handleChartRemoval}
                          moveChart={moveChart}
                          companyData={selectedCompany}
                      />
                  ))}

                  {selectedCharts.length < 6 && (
                      <section
                          className="w-full h-[150px] sm:h-[325px] bg-gray-200 text-gray-600 rounded-2xl shadow-md hover:bg-gray-300 flex justify-center items-center">
                        <button
                            onClick={togglePopup}
                            className="add-chart-button text-[9rem] leading-none"
                        >
                          +
                        </button>
                      </section>
                  )}
                </div>
              </DndProvider>
            </>
        )}
      </div>

      {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-lg font-bold mb-3">Select Charts</h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(chartComponents).map((chart) => (
                    <button
                        key={chart}
                        onClick={() => handleChartSelection(chart)}
                        className={`p-2 rounded-lg shadow-md ${
                            selectedCharts.includes(chart)
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        disabled={selectedCharts.includes(chart)}
                    >
                      {chart.replace(/Chart$/, "")}
                    </button>
                ))}
              </div>
              <button
                  onClick={togglePopup}
                  className="mt-3 bg-red-500 text-white p-2 rounded-lg w-full hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
      )}
    </div>
  </div>
  );
};

export default Dashboard;
