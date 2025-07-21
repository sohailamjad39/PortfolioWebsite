// src/App.jsx
import React, { useState } from "react";
import "./App.css";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import ProjectSection from "./components/ProjectSection";
import ContactSection from "./components/ContactSection";
import LoadingScreen from "./components/LoadingScreen";
import Footer from "./components/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleComplete} />}
      <Background />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProjectSection />
      <ContactSection />
      <Footer/>
    </>
  );
}

export default App;