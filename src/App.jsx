import React from "react";
import "./App.css";
import Background from "./components/background";
import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import OrbitSection from "./components/OrbitSection";
import ServicesSection from "./components/ServicesSection";
import ProjectSection from "./components/ProjectSection";
import ContactSection from "./components/ContactSection";

function App() {
  return (
    <>
      <Background/>
        <Navbar />
        <HeroSection />
        <ServicesSection/>
        <ProjectSection/>
        <ContactSection/>
    </>
  );
}

export default App;
