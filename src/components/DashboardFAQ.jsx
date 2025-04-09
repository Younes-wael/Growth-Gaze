import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import backroundImage from "../assets/FAQ.jpg";
import TopBar from "./Navigation/TopBar";


// FAQ Seite stellt Antworten für Dashboard bezogene Fragen.
const DashboardFAQ = () => {
    const [openIndices, setOpenIndices] = useState([]);

    const faqs = [
        {
            question: "What is Growth Gaze?",
            answer:
                "Growth Gaze is a platform that centralizes startup data, making it easy for investors to analyze and compare key metrics.",
        },
        {
            question: "How does Growth Gaze simplify investment decisions?",
            answer:
                "Our platform provides automated analyses, visualized KPIs, and intuitive dashboards to help you make data-driven decisions confidently.",
        },
        {
            question: "Is Growth Gaze suitable for beginners?",
            answer:
                "Absolutely! Growth Gaze is designed for both beginners and experienced investors, with tools and features that cater to all skill levels.",
        },
        {
            question: "How does Growth Gaze help me as a beginner?",
            answer:
                "Growth Gaze offers Onboarding Walkthroughs, visual KPIs, and a simple interface to guide you through startup analysis and investment.",
        },
    ];

    // Funktion zum Öffnen/Schließen einer FAQ-Frage
    const handleToggle = (index) => {
        setOpenIndices((prevIndices) => {
            if (prevIndices.includes(index)) {
                // Wenn die Frage bereits offen ist, entferne sie aus dem geöffneten State
                return prevIndices.filter((i) => i !== index);
            } else {
                // Falls nicht, füge sie zum State hinzu
                return [...prevIndices, index];
            }
        });
    };

    return (
        <div
            className="relative min-h-screen flex flex-col"
            style={{
                backgroundImage: `url(${backroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-white/50">
            <TopBar currentPage="FAQPage" />
            </div>

            {/* Navigationsleiste (TopBar) */}
            <TopBar currentPage="FAQPage" />

            {/* Hauptinhalt der FAQ-Seite */}
            <div className="relative max-w-4xl mx-auto text-black p-8 bg-white rounded-lg shadow-lg mt-8">

                <h1 className="text-4xl font-bold text-center mb-8">
                    FAQ - Frequently Asked Questions
                </h1>

                {/* FAQ-Accordion-Liste */}
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-lg border border-gray-300 hover:border-indigo-400 transition-colors duration-300"
                        >
                            {/* Frage mit Klick-Handler zum Ein-/Ausklappen */}
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => handleToggle(index)}
                            >
                                <h3 className="text-2xl font-semibold text-gray-800">{faq.question}</h3>
                                {openIndices.includes(index) ? (
                                    <FaChevronUp className="text-indigo-500 ml-4"/>
                                ) : (
                                    <FaChevronDown className="text-gray-500 ml-4"/>
                                )}
                            </div>

                            {/* Antwort mit animierter Ein-/Ausblendung */}
                            <div
                                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                                    openIndices.includes(index) ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                                }`}
                                style={{maxHeight: openIndices.includes(index) ? "300px" : "0"}}
                            >
                                <p className="text-gray-600 mt-4">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardFAQ;
