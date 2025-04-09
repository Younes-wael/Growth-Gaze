"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function VisitorInsightsChart({ companyData }) {
  // State für die Sichtbarkeit der Beschreibung
  const [showDescription, setShowDescription] = useState(false);
  const popupRef = useRef(null);

  // Sicherstellen, dass wir die richtigen Daten aus `companyData` extrahieren
  const visitorData = Object.keys(
    companyData.customer_insights.visitor_insights.monthly
  ).map((month) => ({
    month,
    loyalCustomers:
      companyData.customer_insights.visitor_insights.monthly[month]
        .loyal_customers,
    newCustomers:
      companyData.customer_insights.visitor_insights.monthly[month]
        .new_customers,
    uniqueCustomers:
      companyData.customer_insights.visitor_insights.monthly[month]
        .unique_customers,
  }));

  // HTML-Beschreibung für die Besucheranalyse
  const description = `
    <p><strong>Visitor Insights</strong> provide a detailed breakdown of customer behavior over time.</p>
    <ul>
      <li><strong>Loyal Customers:</strong> Returning customers.</li>
      <li><strong>New Customers:</strong> First-time buyers.</li>
      <li><strong>Unique Customers:</strong> Distinct customers.</li>
    </ul>
  `;

  // Klick-Event zum Schließen der Beschreibung, wenn außerhalb geklickt wird
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
    <div className="p-4 bg-white rounded-xl shadow-md relative" style={{ maxWidth: "600px", margin: "0 auto" }}>
      {/* Titel mit Tooltip-Funktion zum Anzeigen der Beschreibung */}
      <div className="relative">
        <h3
          className="text-black text-lg font-semibold mb-3 cursor-help"
          onClick={() => setShowDescription((prev) => !prev)}
        >
          Visitor Insights
        </h3>

        {/* Popup-Beschreibung für die Besucherdaten */}
        {showDescription && (
          <div
            ref={popupRef}
            className="absolute top-10 left-0 bg-gray-100 p-4 rounded-md shadow-lg z-10 w-72"
          >
            <div
              className="text-sm text-gray-700"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          </div>
        )}
      </div>

      {/* Linien-Diagramm für Besucherdaten */}
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={visitorData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10 }}
            tickFormatter={(month) => month.substring(0, 3)}// Kürzt Monatsnamen auf drei Buchstaben
            height={50}// Dreht die Monatsnamen zur besseren Lesbarkeit
          />
          <YAxis tick={{ fontSize: 10 }} /> {/* Y-Achse für Werte */}
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <Legend verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: 10 }} /> {/* Legende für Linienfarben */}
          <Line type="monotone" dataKey="loyalCustomers" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="newCustomers" stroke="#FF4D4F" strokeWidth={2} />
          <Line type="monotone" dataKey="uniqueCustomers" stroke="#FFCC00" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

 
    </div>
  );
}

export default VisitorInsightsChart;
