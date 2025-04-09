"use client";

import React, { useEffect, useState, useRef } from "react";
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer, Legend, YAxis, XAxis } from "recharts";
import getCurrentMonth from "../getCurrentMonth";

const CustomerSatisfactionChart = ({ companyData }) => {
  const [chartData, setChartData] = useState([]); // Zustand für die Diagrammdaten
  const [currentMonth, setCurrentMonth] = useState(""); // Aktueller Monat
  const [previousMonth, setPreviousMonth] = useState(""); // Vorheriger Monat
  const [showDefinition, setShowDefinition] = useState(false); // Anzeige für Infobox
  const popupRef = useRef(null); // Referenz für das Popup

  // Lädt Kundenzufriedenheitsdaten, wenn `companyData` verfügbar ist
  useEffect(() => {
    if (!companyData || !companyData.customer_insights?.customer_satisfaction) return;

    const satisfactionData = companyData.customer_insights.customer_satisfaction.monthly;
    const monthNames = Object.keys(satisfactionData);
    const now = getCurrentMonth(); // Holt aktuellen Monat
    const currentIndex = monthNames.indexOf(now);
    const prevIndex = currentIndex === 0 ? monthNames.length - 1 : currentIndex - 1;

    setCurrentMonth(monthNames[currentIndex]);
    setPreviousMonth(monthNames[prevIndex]);

    // Holt Daten für den aktuellen und den vorherigen Monat
    const currentMonthData = satisfactionData[monthNames[currentIndex]];
    const previousMonthData = satisfactionData[monthNames[prevIndex]];

    // Formatiert Daten für das Diagramm
    const formattedData = Object.keys(currentMonthData).map((week) => ({
      week: week.replace("week_", "Week "), // "week_1" → "Week 1"
      currentMonth: (currentMonthData[week]?.monday || 0) + (currentMonthData[week]?.friday || 0),
      previousMonth: (previousMonthData[week]?.monday || 0) + (previousMonthData[week]?.friday || 0),
    }));

    setChartData(formattedData);
  }, [companyData]);

  // Schließt das Popup, wenn außerhalb geklickt wird
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) setShowDefinition(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="relative">
        <h3
          className="text-black text-lg font-semibold mb-2 cursor-help"
          onClick={() => setShowDefinition((prev) => !prev)}
        >
          Customer Satisfaction
        </h3>

        {/* Infobox, die bei Klick erscheint */}
        {showDefinition && (
          <div
            ref={popupRef}
            className="absolute top-8 left-0 bg-gray-100 p-4 rounded-md shadow-lg z-10 w-64"
          >
            <p className="text-sm text-gray-700">
              <strong>Customer Satisfaction</strong> reflects how happy customers are with a company's products and services. It is a key metric for understanding customer loyalty and business success.
            </p>
            <br />
            <strong>Why Customer Satisfaction Matters:</strong>
            <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
              <li><strong>Competitive Edge:</strong> Stand out in crowded markets by prioritizing customer happiness.</li>
              <li><strong>Brand Advocacy:</strong> Happy customers become loyal advocates, spreading positive word-of-mouth.</li>
              <li><strong>Fuel for Innovation:</strong> Valuable feedback drives product improvements and future growth.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Diagramm für die Kundenzufriedenheit */}
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <Legend verticalAlign="bottom" align="center" />
          <Area
            type="monotone"
            dataKey="currentMonth"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.3}
            name={`This Month (${currentMonth})`}
          />
          <Area
            type="monotone"
            dataKey="previousMonth"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
            name={`Last Month (${previousMonth})`}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Zusammenfassung der Monatswerte */}
      <div className="flex justify-center mt-2 space-x-4">
        <div className="text-center">
          <div className="text-blue-600 font-bold text-sm">
            {chartData.reduce((sum, data) => sum + (data.previousMonth || 0), 0)}
          </div>
          <div className="text-gray-500 text-xs">Last Month ({previousMonth})</div>
        </div>
        <div className="text-center">
          <div className="text-green-600 font-bold text-sm">
            {chartData.reduce((sum, data) => sum + (data.currentMonth || 0), 0)}
          </div>
          <div className="text-gray-500 text-xs">This Month ({currentMonth})</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSatisfactionChart;