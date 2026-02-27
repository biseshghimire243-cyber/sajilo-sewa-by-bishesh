// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Home() {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load services
    axios
      .get("http://localhost:5000/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));

    // Load logged-in user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // Show login success message
    if (location.state?.success) {
      setSuccessMessage(location.state.success);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      {/* Success message */}
      {successMessage && (
        <div className="alert alert-success text-center m-0 rounded-0">
          {successMessage}
        </div>
      )}

      {/* Small Profile Avatar with Red Logout Dot */}
      {user && (
        <div
          style={{
            position: "fixed",
            top: "15px",
            right: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            zIndex: 1000,
          }}
        >
          {/* Avatar */}
          <img
            src={user.photo || "/images/default-avatar.png"}
            alt={user.name}
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              border: "2px solid white",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          />

          {/* Red Logout Dot */}
          <span
            onClick={handleLogout}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "red",
              cursor: "pointer",
              display: "inline-block",
            }}
            title="Logout"
          ></span>
        </div>
      )}

      {/* Hero Section */}
      <section
        className="hero-section d-flex align-items-center justify-content-center text-center text-white"
        style={{
          minHeight: "90vh",
          background:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/hero-bg.jpg') center/cover no-repeat",
        }}
      >
        <div style={{ maxWidth: "700px" }}>
          <h1 className="display-3 fw-bold mb-3 animate__animated animate__fadeInDown">
            Sajilo Sewa
          </h1>
          <p className="lead fs-4 mb-4 animate__animated animate__fadeInUp">
            Trusted services at your doorstep. Fast, reliable, and affordable.
          </p>
          <Link
            to="/services"
            className="btn btn-gradient btn-lg animate__animated animate__zoomIn"
          >
            Explore Services
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-4 fw-bold">Why Choose Sajilo Sewa?</h2>
          <p className="mb-4 fs-5">
            Connect with verified professionals like electricians, plumbers, mechanics, carpenters, painters, and more.
          </p>
          <Link to="/contact" className="btn btn-outline-primary btn-lg">
            Contact Us
          </Link>
        </div>
      </section>

      {/* Featured Services */}
      <section className="featured-services py-5 text-center bg-white">
        <div className="container">
          <h2 className="mb-5 fw-bold">Popular Services</h2>
          <div className="row g-4">
            {services.slice(0, 8).map((service) => (
              <div className="col-md-3 col-sm-6" key={service.id}>
                <div className="card service-card shadow-sm h-100">
                  <div className="card-img-wrapper">
                    <img
                      src="aaa.jpg"
                      className="card-img-top"
                      alt={service.name}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{service.name}</h5>
                    <p className="card-text">{service.description}</p>
                    <Link
                      to={`/services/${service.id}`}
                      className="btn btn-primary w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {services.length > 0 && (
            <Link to="/services" className="btn btn-primary btn-lg mt-4">
              See All Services
            </Link>
          )}
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section
        className="cta-section py-5 text-white text-center"
        style={{ background: "linear-gradient(135deg, #494c4f, #00c6ff)" }}
      >
        <div className="container">
          <h3 className="mb-3 fw-bold">Book Your Service Now!</h3>
          <p className="mb-4 fs-5">
            Fast, reliable, and verified professionals at your service.
          </p>
          <Link to="/services" className="btn btn-light btn-lg">
            Book Now
          </Link>
        </div>
      </section>

      {/* Custom Styles */}
      <style>
        {`
          .service-card {
            transition: transform 0.3s, box-shadow 0.3s;
            border-radius: 12px;
            overflow: hidden;
          }
          .service-card:hover {
            transform: translateY(-10px) scale(1.03);
            box-shadow: 0 15px 30px rgba(0,0,0,0.3);
          }
          .card-img-wrapper {
            overflow: hidden;
            height: 180px;
          }
          .card-img-wrapper img {
            width: 50%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          .card-img-wrapper img:hover {
            transform: scale(1.1);
          }
          .btn-gradient {
            background: linear-gradient(135deg, #007bff, #00c6ff);
            border: none;
            color: white;
            transition: 0.3s;
          }
          .btn-gradient:hover {
            opacity: 0.9;
          }
        `}
      </style>
    </div>
  );
}

export default Home;