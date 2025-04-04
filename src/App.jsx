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
import AddProductForm from "./components/AddProductForm";
import FlippingCard from "./components/FlippingCard";
import ProductManager from "./components/ProductManager";
import OrderManager from "./components/OrderManager";
import Details from "./components/Details";
import AddToCart from "./components/AddToCard";
import Payment from "./components/Payment";
import AdminLogin from "./components/AdminLogin";
import SecretKeyListener from "./components/SecretKeyListener";
import Services from "./components/Services";
import FarmingForm from "./components/FarmingForm";
import Options from "./components/Options";
import TrustedFarms from "./components/TrustedFarms";
import BuyerDashboard from "./components/BuyerDashboard";
import ProductCarousel from "./components/ProductCarousel";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import BuyerProfile from "./components/Buyerprofile";
import AdminUserManagement from "./components/AdminUserManagement";
import ProductHome from "./components/ProductHome";
import SellerLogin from "./components/SellerLogin";
import Checkout from "./components/Checkout";
import PaymentFinal from "./components/PaymentFinal";
import Testimonials from "./components/Testimonials";
import ManageServices from "./components/SuperAdminDashboard";
import CustomizedFarming from "./components/CustomizedFarming";
import GlobeExpress from "./components/GlobeExpress";
import WeatherSuggestion from "./components/WeatherSuggestion";
import HomeGardeningTips from "./components/HomeGardeningTips";
import ContactUs from "./components/ContactUs";
import Packages from "./components/Packages";
import CustomizedFarmingForm from "./components/CustomizedFarmingForm";
import Slider from "./components/Slider";
import SellerLandingPage from "./components/SellerLandingPage";
import WeeklyRevenueChart from "./components/WeeklyRevenueChart";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import AboutPage from "./components/AboutPage";
import OurTeam from "./components/OurTeam";
import ProfileCard from "./components/ProfileCard";


const App = () => {
  // A function to conditionally render the header
  const ShowHeader = () => {
    const location = useLocation();
    // Do not show the header on the login page
    return <Header />;
  };
  const ShowFooter = () => {
    const location = useLocation();
    // Do not show the header on the login page
    return <Footer />;
  };
  return (
    <Router>
      {/* Conditionally render the Header */}
      <ShowHeader />
      <SecretKeyListener/>

      {/* Define routes for navigation */}
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <HeroSection/>
              <TrustedFarms/>
              <ProductHome/>
              <ProductCarousel />
              <Testimonials/>
              <OurTeam/>

            </>
          }
        />

        {/* Login Page */}
        <Route path="/login" element={<ContSign />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} /> {/* Add the Profile route here */}
        <Route path="/SellerLanding" element={<SellerLandingPage />} />
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/dashboard/:sellerId" element={<SellerDashboard />} />        
        <Route path="/product/:id" element={<Details />} /> {/* Route for product detail page */}
        <Route path="/SellerSignup" element={<SellerSignup />} />
        <Route path="/dashboard" element={<SellerDashboard />} />
        <Route path="/addproductform" element={<AddProductForm />} />
        <Route path="/flipping" element={<FlippingCard />} />
        <Route path="/admin" element={<ProductManager />} />
        <Route path="/orderadmin" element={<OrderManager />} />
        <Route path="/productdetail" element={<Details/>} />
        <Route path="/cart" element={<AddToCart/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/admin-login" element={<AdminLogin/>}/>       
        <Route path="/services" element={<Services/>}/>
        <Route path="/farmform" element={<FarmingForm/>}/>
        <Route path="/options" element={<Options/>}/>
        <Route path="/buyers" element={<BuyerDashboard/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/buyerprofile" element={<BuyerProfile/>}/>
        <Route path="/useradmin" element={<AdminUserManagement/>}/>
        <Route path="/SellerLogin" element={<SellerLogin/>}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-final" element={<PaymentFinal />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/superadmin" element={<ManageServices />} />
        <Route path="/customize" element={<CustomizedFarming />} />
        <Route path="/globe" element={<GlobeExpress />} />
        <Route path="/weather" element={<WeatherSuggestion />} />
        <Route path="/tips" element={<HomeGardeningTips />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/farmingform" element={<CustomizedFarmingForm />} />
        <Route path="/slider" element={<Slider />} />
        <Route path="/chart" element={<WeeklyRevenueChart />} />
        <Route path="/AnalyticsDashboard" element={<AnalyticsDashboard />} />
        <Route path="/team" element={<ProfileCard />} />




        </Routes>
        <ShowFooter/>
    </Router>
  );
};

export default App;
