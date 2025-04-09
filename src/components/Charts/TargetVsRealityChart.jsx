"use client";

import React, { useState, useEffect, useRef } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function TargetVsRealityChart({ companyData }) {
  const [showDescription, setShowDescription] = useState(false);
  const popupRef = useRef(null);

  if (!companyData) return <p>Loading...</p>;

  // Daten aus JSON extrahieren
  const salesData = Object.keys(companyData.performance_metrics.target_vs_reality.monthly).map(
    (month) => ({
      month,
      targetSales: companyData.performance_metrics.target_vs_reality.monthly[month].target_sales,
      actualSales: companyData.performance_metrics.target_vs_reality.monthly[month].actual_sales,
    })
  );

  // Beschreibungstext für das Info-Popup
  const description = `
    <p><strong>Target vs Reality</strong> provides an overview of planned sales goals compared to actual sales achieved.</p>
    <ul>
      <li><strong>Target Sales:</strong> Predefined sales goals for each month.</li>
      <li><strong>Reality Sales:</strong> Actual sales performance achieved.</li>
      <li>Comparison helps measure efficiency and adjust strategies.</li>
    </ul>
  `;

  // Schließt das Popup, wenn außerhalb davon geklickt wird
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowDescription(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg relative">
      <div className="relative">
        <h3
          className="text-black text-lg font-semibold mb-2 cursor-help"
          onClick={() => setShowDescription((prev) => !prev)}
        >
          Target vs Reality
        </h3>

        {/* Info-Popup mit Beschreibung der Diagrammdaten */}
        {showDescription && (
          <div
            ref={popupRef}
            className="absolute top-8 left-0 bg-gray-100 p-4 rounded-md shadow-lg z-10 w-80"
          >
            <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: description }}></div>
          </div>
        )}
      </div>

      {/* Responsives Balkendiagramm für den Vergleich von Ziel- und tatsächlichen Verkäufen */}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            interval={0}
            tick={{ fontSize: 12 }}
            tickFormatter={(month) => month.substring(0, 3)}// Kürzt Monate zu "Jan", "Feb"
          />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <Bar dataKey="actualSales" fill="#82ca9d" name="Reality Sales" barSize={20} />
          <Bar dataKey="targetSales" fill="#FFCC00" name="Target Sales" barSize={20} />
        </BarChart>
      </ResponsiveContainer>

      {/* Eigene Legende zur Anzeige der Summen von Reality und Target Sales */}
      <div className="flex flex-col space-y-2 mt-4">
        {/* Reality Sales */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 rounded-full p-1">
              <span className="text-green-500 text-lg">🛍️</span>
            </div>
            <div>
              <p className="text-gray-800 font-bold text-sm">Reality Sales</p>
              <p className="text-gray-500 text-xs">Global</p>
            </div>
          </div>
          <p className="text-green-600 font-bold text-sm text-right">
            {salesData.reduce((sum, data) => sum + data.actualSales, 0).toLocaleString()}
          </p>
        </div>

        {/* Target Sales */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-100 rounded-full p-1">
              <span className="text-yellow-500 text-lg">🎯</span>
            </div>
            <div>
              <p className="text-gray-800 font-bold text-sm">Target Sales</p>
              <p className="text-gray-500 text-xs">Commercial</p>
            </div>
          </div>
          <p className="text-yellow-600 font-bold text-sm text-right">
            {salesData.reduce((sum, data) => sum + data.targetSales, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TargetVsRealityChart;