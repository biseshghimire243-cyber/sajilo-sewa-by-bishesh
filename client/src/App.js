import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";

// Components
import Navbar from "./components/Navbar";
import FloatingBooking from "./components/FloatingBooking"; // ✅ import at top

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
      </Routes>

      {/* Floating Booking button */}
      <FloatingBooking />
    </Router>
  );
}

export default App;