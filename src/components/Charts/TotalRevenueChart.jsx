"use client";

import React, { useState, useRef, useEffect } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const TotalRevenueChart = ({ companyData }) => {
  // State für die Auswahl des Zeitrahmens (wochen- oder monatsweise Anzeige)
  const [timeframe, setTimeframe] = useState("weekly");

  // State zur Steuerung der Sichtbarkeit der Beschreibung
  const [showDescription, setShowDescription] = useState(false);

  // Referenz für das Beschreibungselement, um Klicks außerhalb zu erkennen
  const descriptionRef = useRef(null);

  // Sicherstellen, dass die richtigen Daten aus dem `companyData`-Objekt extrahiert werden
  const weeklyData = Object.keys(companyData.performance_metrics.total_revenue.weekly).map((day) => ({
    day, // Wochentag als Schlüssel
    online: companyData.performance_metrics.total_revenue.weekly[day].online, // Online-Umsatz
    offline: companyData.performance_metrics.total_revenue.weekly[day].offline, // Offline-Umsatz
  }));

  // Extrahiert die monatlichen Daten aus companyData
  const monthlyData = Object.keys(companyData.performance_metrics.total_revenue.monthly).map((week) => ({
    week, // Woche als Schlüssel
    online: companyData.performance_metrics.total_revenue.monthly[week].online, // Online-Umsatz
    offline: companyData.performance_metrics.total_revenue.monthly[week].offline, // Offline-Umsatz
  }));

  // Bestimmt die anzuzeigenden Daten basierend auf dem ausgewählten Zeitraum
  const data = timeframe === "weekly" ? weeklyData : monthlyData;

  // Schließt die Beschreibung, wenn außerhalb davon geklickt wird
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (descriptionRef.current && !descriptionRef.current.contains(event.target)) {
        setShowDescription(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg relative mb-4" style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div className="flex justify-between items-center mb-2">
        <h3
          className="text-black text-lg font-semibold cursor-help"
          onClick={() => setShowDescription((prev) => !prev)}
        >
          Total Revenue
        </h3>
        {/* Auswahlfeld für den Zeitrahmen (Woche oder Monat) */}
        <div className="relative">
          <select
            className="bg-gray-100 border rounded-md px-2 py-1 cursor-pointer text-sm"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="weekly">Week</option>
            <option value="monthly">Month</option>
          </select>
        </div>
      </div>

      {/* Beschreibung der Grafik */}
      {showDescription && (
        <div ref={descriptionRef} className="absolute top-12 left-0 bg-gray-100 p-3 rounded-md shadow-lg z-10 w-64">
          <p className="text-sm text-gray-700">
            <strong>Total Revenue</strong> provides insights into the business's financial performance by tracking both{" "}
            <strong>online</strong> and <strong>offline sales</strong>. It allows businesses to compare revenue streams
            and optimize sales strategies for better growth. Weekly and monthly views offer flexibility in analyzing
            short-term and long-term trends.
          </p>
        </div>
      )}

      {/* Diagramm mit dynamischer Breite */}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={timeframe === "weekly" ? "day" : "week"} tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          /> {/* Tooltip für genauere Werteanzeige */}
          <Legend verticalAlign="bottom" align="center" /> {/* Legende für die Balkenfarben */}

          {/* Balken für Online-Verkäufe */}
          <Bar dataKey="online" fill="#8884d8" name="Online Sales" radius={[10, 10, 0, 0]} />

          {/* Balken für Offline-Verkäufe */}
          <Bar dataKey="offline" fill="#82ca9d" name="Offline Sales" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

    
    </div>
  );
};

export default TotalRevenueChart;