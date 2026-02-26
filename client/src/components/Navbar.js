import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      backgroundColor: "#0d6efd",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white"
    }}>
      <h2>Sajilo Sewa</h2>

      <div>
        <Link to="/" style={{ color: "white", marginRight: "10px", textDecoration: "none" }}>
          Home
        </Link>
        {/* <Link to="/services" style={{ color: "white", textDecoration: "none" }}>
          Services
        </Link> */}
        {/* <Link to="/contact" style={{ color: "white", textDecoration: "none", marginLeft:"20px" }}>
        Contact
        </Link> */}
        {/* <li className="nav-item">
  <Link className="nav-link" to="/contact">Contact</Link>
</li> */}

      </div>
    </nav>
  );
}

export default Navbar;
