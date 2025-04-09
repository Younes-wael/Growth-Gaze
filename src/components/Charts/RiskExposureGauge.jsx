import React, { useState, useRef, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";

const RiskExposureGauge = ({ companyData }) => {
  // Überprüfung ob Unternehmensdaten vorhanden sind ansonsten wird nichts gerendert
  if (!companyData || !companyData.risk_exposure_index) return null;

  const [showDescription, setShowDescription] = useState(false);
  const popupRef = useRef(null);

  const riskData = companyData.risk_exposure_index;
  const riskFactors = riskData.risk_factors || {};

  // Beschreibung des Risk Exposure Index mit HTML-Inhalt
  const description = `
    <p>The <strong>Risk Exposure Index</strong> provides an overview of the organization's exposure to potential risks.</p>
    <ul>
      <li><strong>Financial Risk:</strong> Indicates financial stability and potential liabilities.</li>
      <li><strong>Customer Risk:</strong> Reflects risks related to customer satisfaction and retention.</li>
      <li><strong>Market Risk:</strong> Measures external market conditions and competition.</li>
      <li><strong>Technical Risk:</strong> Evaluates risks related to technology and infrastructure.</li>
      <li><strong>Compliance Risk:</strong> Assesses regulatory and legal compliance risks.</li>
      <li><strong>Employee Risk:</strong> Represents risks associated with employee satisfaction and retention.</li>
    </ul>
    <p>Use this data to identify and mitigate vulnerabilities effectively.</p>
  `;

  // Klick-Handler, um das Info-Popup zu schließen, wenn außerhalb geklickt wird
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowDescription(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-xl mx-auto relative">
      {/* Titel mit Klick-Funktion zur Anzeige der Beschreibung */}
      <div className="relative mb-3">
        <h3
          className="text-xl font-semibold text-gray-800 cursor-help"
          onClick={() => setShowDescription(!showDescription)}
        >
          Risk Exposure Index
        </h3>

        {/* Popup-Beschreibung mit zusätzlichen Informationen zum Index */}
        {showDescription && (
          <div
            ref={popupRef}
            className="absolute top-10 left-0 bg-gray-100 p-3 rounded-md shadow-md z-10 w-64"
          >
            <p
              className="text-sm text-gray-700"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        )}
      </div>

      {/* Gauge Chart */}
      <div className="flex justify-center">
        <ReactSpeedometer
          value={riskData.overall_risk_score}
          minValue={0}
          maxValue={100}
          segments={3}
          segmentColors={["#00C853", "#FFEB3B", "#D50000"]}
          needleColor="steelblue"
          currentValueText={`Overall Risk Score: ${riskData.overall_risk_score}`}
          width={300}
          height={180}
          customSegmentLabels={[
            { text: "Low", position: "OUTSIDE", color: "#00C853" },
            { text: "Medium", position: "OUTSIDE", color: "#FFEB3B" },
            { text: "High", position: "OUTSIDE", color: "#D50000" },
          ]}
        />
      </div>
      
      {/* Risk Factors List */}
      <div className="bg-gray-100 p-3 rounded-md shadow-md mt-3">
        <h4 className="text-md font-semibold text-gray-700 mb-1">
          Risk Factors
        </h4>
        <ul className="space-y-1">
          {Object.keys(riskFactors).map((factor) => (
            <li
              key={factor}
              className="flex justify-between items-center text-gray-800 text-sm"
            >
              {/* Umformatierung des Faktor-Namens für bessere Lesbarkeit */}
              <span className="capitalize font-medium">
                {factor.replace("_", " ")}
              </span>
              
              {/* Anzeige des Scores für den jeweiligen Risikofaktor */}
              <span className="font-bold text-gray-600">
                {riskFactors[factor].score}/100
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RiskExposureGauge;
