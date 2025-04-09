import React from "react";

const TopProducts = ({ companyData }) => {
  // Falls keine Daten vorhanden sind, wird ein leeres Array verwendet
  const topProducts = companyData ? companyData.top_products : [];

  return (
    <div className=" p-4 bg-white rounded-2xl shadow-md top-products w-full h-fit">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold text-gray-800">Top Products</h3>
      </div>

      {/* Tabelle mit den Top-Produkten */}
      <div className="overflow-x-auto w-full h-full">
        <table className="w-full text-left border-collapse text-sm h-full">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-1 px-3">#</th>
              <th className="py-1 px-3">Name</th>
              <th className="py-1 px-3">Popularity</th>
              <th className="py-1 px-3">Sales</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">      
                <td className="py-2 px-3">{String(index + 1).padStart(2, "0")}</td>

                {/* Produktname */}
                <td className="py-2 px-3 text-gray-800 font-medium">{product.name}</td>

                {/* Beliebtheit als Balkenanzeige */}
                <td className="py-2 px-3">
                  <div className="flex items-center">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        backgroundColor: getBarColor(index),
                        width: `${parseInt(product.popularity)}%`,
                        maxWidth: "150px",  // Geringere maximale Breite
                        marginRight: "6px",
                      }}
                    ></div>
                    {/* Anzeige des Popularitätswerts als Zahl */}
                    <span className="text-gray-700 text-xs">{product.popularity}</span>
                  </div>
                </td>

                {/* Verkaufszahlen als Badge */}
                <td className="py-2 px-3">
                  <span
                    className="text-white text-xs font-medium py-0.5 px-2 rounded-full"
                    style={{
                      backgroundColor: getBadgeColor(index),
                    }}
                  >
                    {product.sales}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Funktion zur Auswahl der Farbe für den Beliebtheitsbalken basierend auf dem Index.
const getBarColor = (index) => {
  const colors = ["#1E90FF", "#32CD32", "#8A2BE2", "#FFA500"]; // Blau, Grün, Violett, Orange
  return colors[index % colors.length]; // Zyklische Wiederverwendung der Farben
};

// Funktion zur Auswahl der Badge-Farbe für die Verkaufszahlen basierend auf dem Index.
const getBadgeColor = (index) => {
  const colors = ["#007BFF", "#28A745", "#6F42C1", "#FFC107"]; // Blau, Grün, Violett, Gelb
  return colors[index % colors.length]; // Zyklische Wiederverwendung der Farben
};

export default TopProducts;
