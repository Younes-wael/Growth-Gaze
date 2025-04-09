
import { useDrag, useDrop } from "react-dnd";
import { AiOutlineClose, AiOutlineDrag } from "react-icons/ai";

import SalesSummary from "./SalesSummary";
import TargetVsRealityChart from "./TargetVsRealityChart";
import VisitorInsightsChart from "./VisitorInsightsChart";
import VolumeVsServiceLevelChart from "./VolumeVsServiceLevelChart";
import CustomerSatisfactionChart from "./CustomerSatisfactionChart";
import TotalRevenueChart from "./TotalRevenueChart";
import RiskExposureGauge from "./RiskExposureGauge";
import TopProductsChart from "./TopProducts";


// Mapping der Diagramm-Komponenten zu ihren Namen
const chartComponents = {
    TotalRevenueChart,
    CustomerSatisfactionChart,
    TargetVsRealityChart,
    VolumeVsServiceLevelChart,
    RiskExposureGauge,
    TopProductsChart
  };


const DraggableChart = ({ chart, index, removeChart, moveChart, companyData }) => {
   // Drag-Features für die Diagramm-Komponente
  const [{ isDragging }, drag] = useDrag({
    type: "chart",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drop-Funktionalität zum Neuanordnen der Graphen
  const [, drop] = useDrop({
    accept: "chart",
    hover: (item) => {
      if (item.index !== index) {
        moveChart(item.index, index);
        item.index = index;
      }
    },
  });

  // Zuordnung der Diagramm-Komponente basierend auf dem Namen
  const ChartComponent = chartComponents[chart];
  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`relative bg-white  w-full p-7 rounded-lg shadow-lg ${isDragging ? "opacity-50" : "opacity-100"} `}
      style={{ minHeight: "250px" }}
    >
      <button
        onClick={() => removeChart(chart)}
        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 flex items-center justify-center "
      >
        <AiOutlineClose size={16} />
      </button>
      <button
        className="absolute top-2 left-2 bg-gray-700 text-white p-1 rounded-full cursor-move hover:bg-gray-800 flex items-center justify-center "
      >
        <AiOutlineDrag size={16} />
      </button>
      <ChartComponent companyData={companyData} />
    </div>
  );
};


export default DraggableChart;
