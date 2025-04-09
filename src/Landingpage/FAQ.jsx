import React from "react";
import { Link } from "react-router-dom";
import GrowthGaze from "/Logo/growthgaze.png";
import Question from "./Question";

// Array mit häufig gestellten Fragen (FAQs) und Antworten
const questions = [
    {question:"Our Mission", answer:`Growth Gaze simplifies startup investment by providing centralized, transparent,
     and accessible startup data, empowering investors to make confident, informed decisions.`},
    {question:"Our Vision", answer:`To become the go-to platform for democratizing access to startup insights, 
    making investment opportunities accessible to everyone regardless of experience.`},
    {question:"Who Do We Serve?", answer:`We serve a diverse audience, including beginners learning the basics of 
    startup investment through intuitive dashboards, experienced investors accessing detailed analytics and KPIs 
    to make decisions, and educators and students using structured data for research and educational purposes.`},
    {question:"Why Growth Gaze?", answer:`We provide clear and visually appealing dashboards, automated analyses 
    to save time, and a platform designed to cater to everyone, from novices to seasoned professionals.`}
];


const FAQ = () => {
  return (
      <div id="faq">
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Flexbox-Container zur Strukturierung von Bild und Text */}
            <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
              <div className="w-full lg:w-1/2">
                <img
                    src={GrowthGaze}
                    alt="GrowthGaze Logo"
                    className="w-full rounded-xl object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2">
                <div className="lg:max-w-xl">

                  {/* Titel des FAQ-Bereichs */}
                  <div className="mb-6 lg:mb-16">
                    <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">
                      About Us
                    </h2>
                  </div>

                  {/* Accordion-Element für die Fragen */}
                  <div className="accordion-group" data-accordion="default-accordion">
                    {questions.map((data, index) =>{

                        // Falls Frage oder Antwort leer sind, wird nichts gerendert
                        if(data.answer == "" || data.question == ""){
                            return null;
                        }
                        return (
                            <Question answer={data.answer} question={data.question} key={Math.random()}/>
                        );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default FAQ;
