import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import companyMapping from "../../assets/data/index.json";

const Sidebar = ({ setSelectedCompany }) => {
  const [searchQuery, setSearchQuery] = useState(""); // Speichert den Suchbegriff
  const [filteredData, setFilteredData] = useState([]); // Speichert gefilterte Suchergebnisse
  const [searchDataMap, setSearchDataMap] = useState(companyMapping);
  const [selectedItem, setSelectedItem] = useState(null); // Speichert das aktuell ausgewählte Unternehmen
  const [showSuggestions, setShowSuggestions] = useState(false); // Steuert die Anzeige der Suchvorschläge
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // Steuert die Anzeige der Unternehmensbeschreibung

  // Top 5 Unternehmen (vordefiniert)
  const topCompanies = [
    { name: "Company A", filename: "company_a" },
    { name: "Company B", filename: "company_b" },
    { name: "Company C", filename: "company_c" },
    { name: "Company D", filename: "company_d" },
    { name: "Company E", filename: "company_e" },
  ];

  // Um Daten schneller laden zu können ohne einen neuen Import durchzuführen
  const dataCache = {};

  // Lädt dynamisch eine JSON-Datei anhand des Dateinamens
  const loadJsonFile = async (fileName) => {
    if (dataCache[fileName]) {
      return dataCache[fileName];
    }

    try {
      const file = await import(`../../assets/data/${fileName}.json`);
      dataCache[fileName] = file.default;
      return file.default;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Toggles die Sichtbarkeit der Unternehmensbeschreibung
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  // Wählt beim Laden der Sidebar zufällig ein Unternehmen aus
  useEffect(() => {
    try {
      const loadRandomCompany = async () => {
        const randomFile = searchDataMap[Math.floor(Math.random() * searchDataMap.length)];
        const randomCompany = await loadJsonFile(randomFile.filename);

        if (randomCompany) {
          setSelectedItem(randomCompany);
          setSelectedCompany(randomCompany);
        }
      };
      loadRandomCompany();
    } catch (error) {
      console.error(error);
    }
  }, [setSelectedCompany]);

  // Suchfunktion, die Unternehmen anhand des Suchbegriffs filtert
  const handleSearch = async (event) => {
    let query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      try {
        // Unternehmen filtern
        const matchingFiles = searchDataMap.filter((companyIndex) =>
          companyIndex.name.toLowerCase().includes(query)
        );

        if (matchingFiles.length > 0) {
          // Erstelle leere Vorschlagsliste
          const suggestions = await Promise.all(
            matchingFiles.map(async (file) => {
              const data = await loadJsonFile(`${file.filename}`);
              return { ...data, displayName: file.name };
            })
          );

          setShowSuggestions(true);
          setFilteredData(suggestions);
        } else {
          setShowSuggestions(false);
          setFilteredData([]);
        }
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
        setShowSuggestions(false);
        setFilteredData([]);
      }
    } else {
      setShowSuggestions(false);
      setFilteredData([]);
    }
  };

  // Setzt das ausgewählte Unternehmen aus der Vorschlagsliste
  const handleSuggestionClick = (company) => {
    setSelectedItem(company);
    setSelectedCompany(company);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  // Lädt die Daten eines Unternehmens aus der Top-5-Liste
  const handleTopCompanyClick = async (filename) => {
    const companyData = await loadJsonFile(filename);
    if (companyData) {
      setSelectedItem(companyData);
      setSelectedCompany(companyData);
    }
  };

  return (
    <div className="w-[270px] h-screen flex flex-col bg-white shadow-md p-5 overflow-y-auto sticky top-0 sidebar">
      {/* Logo Section */}
      <div className="mb-2"></div>

      {/* Search Box */}
      <div className="flex items-center bg-gray-100 rounded-lg p-2 mt-2 relative">
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onFocus={() => setShowSuggestions(true)}
          onChange={handleSearch}
          className="w-full bg-transparent border-none outline-none ml-3 text-[18px] text-gray-500 font-poppins"
        />
        {showSuggestions && searchQuery && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md z-10">
            {filteredData.length > 0 ? (
              filteredData.map((company, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleSuggestionClick(company)}
                >
                  <img src={company.logo} alt={company.name} className="w-8 h-8 object-cover rounded-full mr-2" />
                  <span>{company.name}</span>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No results found</div>
            )}
          </div>
        )}
      </div>

      {/* Selected Item Section */}
      {selectedItem && (
        <div className="mt-10 flex-grow">
          {/* Name */}
          <div className="flex items-center rounded-lg p-2">
            <div className="w-12 h-12">
              <img src={selectedItem.logo} alt={`Logo`} className="w-full h-full object-cover rounded-full" />
            </div>
            <p className="ml-3 text-[18px] text-blue-900 font-poppins">{selectedItem.name}</p>
          </div>

          {/* Industry */}
          <div className="flex items-center rounded-lg p-2">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex justify-center items-center">
              <i className="fas fa-industry text-2xl text-black"></i>
            </div>
            <p className="ml-3 text-[18px] text-blue-900 font-poppins">{selectedItem.industry}</p>
          </div>

          {/* Founder */}
          <div className="flex items-center rounded-lg p-2">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex justify-center items-center">
              <i className="fas fa-user-tie text-2xl text-black"></i>
            </div>
            <p className="ml-3 text-[18px] text-blue-900 font-poppins">{selectedItem.founder}</p>
          </div>

          {/* Location */}
          <div className="flex items-center rounded-lg p-2">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex justify-center items-center">
              <i className="fas fa-map-marker-alt text-2xl text-black"></i>
            </div>
            <p className="ml-3 text-[18px] text-blue-900 font-poppins">{selectedItem.location}</p>
          </div>

          {/* Founded Year */}
          <div className="flex items-center rounded-lg p-2">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex justify-center items-center">
              <i className="fas fa-calendar-alt text-2xl text-black"></i>
            </div>
            <p className="ml-3 text-[18px] text-blue-900 font-poppins">{selectedItem.founded_year}</p>
          </div>

          {/* Collapsible Description */}
          <div className="flex flex-col items-start rounded-lg p-2">
            <button onClick={toggleDescription} className="ml-1 text-[16px] text-blue-900 font-poppins flex items-center space-x-4">
              <span>Description</span>
              <span>{isDescriptionExpanded ? "▲" : "▼"}</span>
            </button>
            {isDescriptionExpanded && (
              <p className="mt-3 text-[16px] text-gray-700 font-poppins leading-relaxed bg-gray-100 p-4 rounded-lg shadow-md">
                {selectedItem.description?.length > 100
                  ? `${selectedItem.description.slice(0, 100)}... `
                  : selectedItem.description}
                {selectedItem.description?.length > 100 && (
                  <Link to="/company" state={{ companydata: selectedItem }}>
                    <p className="text-blue-500 hover:underline mt-2">View More</p>
                  </Link>
                )}
              </p>
            )}
          </div>

          {/* Top 5 Unternehmen Liste */}
          <div className="mt-4">
            <h3 className="text-[18px] text-blue-900 font-poppins mb-2">Top Companies</h3>
            <ul className="space-y-2">
            {
              companyMapping.slice(0, 4).map((company, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                  onClick={() => handleTopCompanyClick(company.filename)}
                >
                  <span className="text-[14px] text-gray-700 font-bold">{index +1}. {company.name}</span>
                </li>
              ))
            }
            </ul>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div className="mt-5 pt-5 border-t border-gray-300">
        <Link to="/DashboardFAQ">
          <div className="flex items-center text-blue-700 hover:text-blue-900 text-[18px] font-poppins">
            <i className="fa-regular fa-circle-question text-xl mr-2"></i>
            FAQ
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;