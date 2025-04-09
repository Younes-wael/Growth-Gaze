import React, { useState, useEffect, useRef } from "react";

const SalesSummary = ({ companyData }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef(null);
  const titleRef = useRef(null); // Referenz für den Titel-Header

  // Überprüfung, ob Unternehmensdaten vorhanden sind, andernfalls wird eine Meldung angezeigt
  if (!companyData || !companyData.performance_metrics?.sales_summary) {
    return <p className="text-gray-500">No sales data available.</p>;
  }

  const salesSummary = companyData.performance_metrics.sales_summary;

  // Beschreibung für das Popup mit erklärenden Informationen zu den Verkaufsmetriken
  const description = (
    <>
      <strong>"Year Sales"</strong> provides an overview of key sales metrics, including 
      total sales revenue, the number of orders placed, products sold, 
      and the number of new customers acquired. 
      This summary helps businesses monitor performance and identify trends in real-time.
    </>
  );

  // Effekt zur Verwaltung von Klicks außerhalb des Popups, um es zu schließen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target) && titleRef.current && !titleRef.current.contains(event.target)) {
        setShowDescription(false);
      }
    };

    // Ermittelt die Position des Titels und setzt das Popup
    if (showDescription && titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      setPopupPosition({
        top: rect.bottom + window.scrollY, // Direkt unterhalb des Titels
        left: rect.left + window.scrollX, // Gleiche horizontale Position wie der Titel
      });
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDescription]);

  return (
    <div className="p-4 bg-white rounded-md shadow-md relative mb-4" style={{ maxWidth: "800px", margin: "0 auto", height: "100%" }}>
      {/* Header-Bereich mit klickbarem Titel für das Info-Popup */}
      <div className="flex justify-between items-center mb-2">
        <h2
          ref={titleRef} // Referenz zum Titel hinzufügen
          className="text-lg font-semibold text-gray-800 cursor-help"
          onClick={() => setShowDescription(!showDescription)}
        >
          Year Sales
        </h2>
      </div>
      <p className="text-gray-500 text-sm mb-2">Sales Summary</p>

      {/* Beschreibung Popup, das jetzt korrekt positioniert wird */}
      {showDescription && (
        <div
          ref={popupRef}
          className="absolute bg-gray-100 p-3 rounded-md shadow-md w-64 z-10"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
          }}
        >
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      )}

      {/* Metriken (wachsen mit der Containergröße) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
        {[
          { label: "Total Sales", value: salesSummary.total_sales, color: "red", icon: "💰" },
          { label: "Total Orders", value: salesSummary.total_orders, color: "yellow", icon: "📝" },
          { label: "Products Sold", value: salesSummary.products_sold, color: "green", icon: "📦" },
          { label: "New Customers", value: salesSummary.new_customers, color: "blue", icon: "👤" },
        ].map((item, index) => (
          <div key={index} className={`bg-${item.color}-100 p-4 rounded-md flex flex-col items-center w-full`}>
            <div className={`text-${item.color}-500 text-2xl mb-1`}>{item.icon}</div>
            <div className="text-lg font-semibold text-gray-800">{item.value || "N/A"}</div>
            <div className="text-gray-500 text-sm">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesSummary;
