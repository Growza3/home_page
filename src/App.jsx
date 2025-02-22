import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import Carousel from "./components/Carousel";
import FeaturesSection from "./components/FeaturesSection";
import Recipe from "./components/Recipe";
import ContSign from "./components/ContSign";
import Profile from "./components/Profile"; // Import the Profile component
import "./App.css";
import HeroSection from "./components/HeroSection";
import CounterSection from "./components/CounterSection";
import ExperienceSection from "./components/ExperienceSection";
import AboutUs from "./components/AboutUs";
import HistorySection from "./components/HistorySection";
import Footer from "./components/Footer";
import SellerSignup from "./components/SellerSignup";
import ProductPage from "./components/ProductPage";
import SellerDashboard from "./components/SellerDashboard";
import ProductDetail from "./components/ProductDetail";
import SellerLanding from "./components/SellerLanding";

 

const App = () => {
  // A function to conditionally render the header
  const ShowHeader = () => {
    const location = useLocation();
    // Do not show the header on the login page
    if (location.pathname === "/login" || location.pathname === "/profile") {
      return null;
    }
    return <Header />;
  };

  return (
    <Router>
      {/* Conditionally render the Header */}
      <ShowHeader />

      {/* Define routes for navigation */}
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <HeroSection/>
              <CounterSection/>
              
              <ExperienceSection/>
              <AboutUs/>
              <HistorySection/>
              <Carousel />
              <FeaturesSection />
              <Recipe />
              <Footer/>

            </>
          }
        />

        {/* Login Page */}
        <Route path="/login" element={<ContSign />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} /> {/* Add the Profile route here */}
        <Route path="/SellerLanding" element={<SellerLanding />} />
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/dashboard/:sellerId" element={<SellerDashboard />} />        <Route path="/product/:id" element={<ProductDetail />} /> {/* Route for product detail page */}
        <Route path="/SellerSignup" element={<SellerSignup />} />
        <Route path="/dashboard" element={<SellerDashboard />} />

      </Routes>
    </Router>
  );
};

export default App;
