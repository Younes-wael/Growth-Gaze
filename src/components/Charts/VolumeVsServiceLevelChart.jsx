"use client";

import React, { useState, useEffect, useRef } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Beschreibungskomponente für das Popup
const DescriptionPopup = ({ showDescription, description, popupRef }) => {
  if (!showDescription) return null;

  return (
    <div
      ref={popupRef}
      className="absolute top-12 left-0 bg-gray-100 p-4 rounded-md shadow-lg z-10 w-80"
    >
      <div
        className="text-sm text-gray-700"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

// Legende-Komponente für Gesamtvolumen und Gesamtdienstleistungen
const SalesLegend = ({ label, icon, value, color, description }) => (
  <div className="flex items-center space-x-4">
    <div className={`bg-${color}-100 rounded-full p-2`}>
      <span className={`text-${color}-500 text-xl`}>{icon}</span>
    </div>
    <div>
      <p className="text-gray-800 font-bold text-sm">{label}</p>
      <p className="text-gray-500 text-xs">{description}</p>
    </div>
    <p className={`text-${color}-600 font-bold text-sm ml-auto`}>
      {value.toLocaleString()}
    </p>
  </div>
);

// Hauptkomponente für das Diagramm
const VolumeVsServiceLevelChart = ({ companyData }) => {
  const [showDescription, setShowDescription] = useState(false);
  const popupRef = useRef(null);

  // Prüfen, ob companyData und die relevanten Daten vorhanden sind. Falls nicht, wird eine Fehlermeldung angezeigt.
  if (
    !companyData ||
    !companyData.service_levels ||
    !companyData.service_levels.volume_vs_service_level ||
    !companyData.service_levels.volume_vs_service_level.monthly
  ) {
    return <p className="text-red-500">⚠️ Keine gültigen Daten für dieses Diagramm.</p>;
  }

  // Daten für das Diagramm aus den Rohdaten extrahieren und in ein geeignetes Format umwandeln
  const volumeData = Object.keys(
    companyData.service_levels.volume_vs_service_level.monthly
  ).map((month) => ({
    month,
    volume:
      companyData.service_levels.volume_vs_service_level.monthly[month]?.volume || 0,
    services:
      companyData.service_levels.volume_vs_service_level.monthly[month]?.services || 0,
  }));

  // Beschreibung für das Popup
  const description = `
    <p><strong>Volume vs Service Level</strong> zeigt die Anzahl der Transaktionen im Vergleich zu den erbrachten Dienstleistungen.</p>
    <ul>
      <li><strong>Volumen:</strong> Anzahl der Transaktionen oder Arbeitslast.</li>
      <li><strong>Dienstleistungen:</strong> Erbrachte Services im selben Zeitraum.</li>
    </ul>
    <p>Dieses Diagramm hilft Unternehmen, ihre Arbeitslast besser zu verstehen und Ressourcen effizient zu nutzen.</p>
  `;

  // Klick-Handler für das Schließen des Popups, wenn außerhalb geklickt wird
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
        {/* Titel des Diagramms mit Klick für Popup-Beschreibung */}
        <h3
          className="text-black text-lg font-semibold mb-2 cursor-help"
          onClick={() => setShowDescription((prev) => !prev)}
        >
          Volume vs Service Level
        </h3>

        {/* Popup-Beschreibung */}
        <DescriptionPopup
          showDescription={showDescription}
          description={description}
          popupRef={popupRef}
        />
      </div>

      {/* Diagramm */}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={volumeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            tickFormatter={(month) => month.substring(0, 3)} // Monat abkürzen
          />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <Legend verticalAlign="bottom" align="center" />
          {/* Gestapelte Balken für Volumen und Dienstleistungen */}
          <Bar dataKey="volume" stackId="a" fill="#1E90FF" name="Volumen" />
          <Bar dataKey="services" stackId="a" fill="#32CD32" name="Dienstleistungen" />
        </BarChart>
      </ResponsiveContainer>

      {/* Benutzerdefinierte Legende für Gesamtwerte */}
      <div className="flex flex-col space-y-2 mt-4 ">
        <SalesLegend
          label="Volume"
          icon="📦"
          value={volumeData.reduce((sum, data) => sum + data.volume, 0)}
          color="blue"
          description="All transactions"
        />
        <SalesLegend
          label="Services"
          icon="🛠️"
          value={volumeData.reduce((sum, data) => sum + data.services, 0)}
          color="green"
          description="Service provided"
        />
      </div>
    </div>
  );
};

export default VolumeVsServiceLevelChart;