import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 fw-bold">Our Services</h1>

      <div className="row">
        {services.map((service) => (
          <div className="col-md-4 mb-4" key={service.id}>
            <div className="card shadow-lg border-0 h-100">
              {/* Service Image */}
              <img
                src="bg.jpg"
                alt={service.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover",width: "50%" }}
              />

              <div className="card-body d-flex flex-column">
                <h4 className="card-title text-primary fw-bold">
                  {service.name}
                </h4>

                <p className="card-text text-muted">{service.description}</p>

                <p className="mt-auto">
                  <strong>Contact:</strong> {service.contact}
                </p>

                <Link
                  to={`/services/${service.id}`}
                  className="btn btn-primary w-100 mt-3"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
