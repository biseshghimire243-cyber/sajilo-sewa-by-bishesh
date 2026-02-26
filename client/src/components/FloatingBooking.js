import { Link } from "react-router-dom";
import "./FloatingBooking.css";  // must match exactly

function FloatingBooking() {
  return (
    <Link to="/services" className="floating-booking">
      Book Service
    </Link>
  );
}

export default FloatingBooking;