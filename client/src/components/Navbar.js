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
        <Link to="/" className="btn btn-outline-light ms-3">
  Home
</Link>
<Link to="/login" className="btn btn-outline-light ms-3">
  Login
</Link>

      </div>
    </nav>
  );
}

export default Navbar;
