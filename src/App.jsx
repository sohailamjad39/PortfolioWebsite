import React from "react";
import "./App.css";
import Background from "./components/background";
import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import OrbitSection from "./components/OrbitSection";
import FakeScroll from "./components/FakeScroll";
import ServicesSection from "./components/ServicesSection";

function App() {
  return (
    <>
      <Background/>
        <Navbar />
        <HeroSection />
        <OrbitSection/>
        <ServicesSection/>
        <FakeScroll/>
    </>
  );
}

export default App;
