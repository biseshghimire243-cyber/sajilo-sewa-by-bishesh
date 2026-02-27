import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";

// Components
import Navbar from "./components/Navbar";
import FloatingBooking from "./components/FloatingBooking"; // ✅ import at top
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>

      {/* Floating Booking button */}
      <FloatingBooking />
    </Router>
  );
}

export default App;