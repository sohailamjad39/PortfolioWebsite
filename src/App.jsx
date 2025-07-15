import React from "react";
import "./App.css";
import Background from "./components/background";
import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import OrbitSection from "./components/OrbitSection";

function App() {
  return (
    <>
      <Background/>
        <Navbar />
        <HeroSection />
        <OrbitSection/>
    </>
  );
}

export default App;
