import React, { useState } from "react";

export default function Question({ answer, question }) {
  // State zum Verwalten des Aufklappens
  const [isOpen, setIsOpen] = useState(false);

  // Funktion zum Umschalten der Sichtbarkeit
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      // Hauptcontainer des Akkordeons mit dynamischer Klasse für aktiven Zustand
      className={`accordion pb-8 border-b border-solid border-gray-200 ${
        isOpen ? "active" : ""
      }`}
      id="basic-heading-one-with-arrow-always-open"
    >
      {/* Button zum Öffnen und Schließen des Akkordeons */}
      <button
        onClick={toggleAccordion}
        className={`accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-[#151D48] ${
          isOpen ? "text-[#151D48] font-medium" : ""
        }`}
        aria-controls="basic-collapse-one-with-arrow-always-open"
      >
        <h5>{question}</h5>

        {/* SVG-Pfeil, der sich bei geöffnetem Akkordeon dreht */}
        <svg
          className={`text-gray-900 transition duration-500 group-hover:text-[#151D48] ${
            isOpen ? "text-[#151D48] rotate-180" : ""
          }`}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>

      {/* Akkordeon-Inhalt mit animierter Ein- und Ausblendung */}
      <div
        id="basic-collapse-one-with-arrow-always-open"
        className={`accordion-content w-full px-0 overflow-hidden pr-4 transition-all duration-500 ${
          isOpen ? "max-h-[100px]" : "max-h-0"
        }`}
        aria-labelledby="basic-heading-one-with-arrow-always-open"
      >
        {/* Antworttext des Akkordeons */}
        <p className="text-base font-normal text-gray-600">{answer}</p>
      </div>
    </div>
  );
}
