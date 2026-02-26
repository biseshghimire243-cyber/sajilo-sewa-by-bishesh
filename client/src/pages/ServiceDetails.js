import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/services/${id}`)
      .then(res => setService(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleBooking = () => {
    axios.post("http://localhost:5000/book", {
      serviceId: service.id,
      name,
      phone
    })
    .then(res => {
      setMessage(res.data.msg);
      setName("");
      setPhone("");
    })
    .catch(err => {
      setMessage("Booking failed");
    });
  };

  if (!service) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 border-0">

        {/* Service Image */}
       <img
  src="/bg.jpg"
  alt={service.name}
  style={{
    width: "20%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "8px"
  }}
  className="mb-3"
/>
         

        <h2 className="text-primary fw-bold">{service.name}</h2>
        <p className="text-muted">{service.description}</p>
        <p><strong>Contact:</strong> {service.contact}</p>

        <hr />

        <h4 className="mb-3">Book This Service</h4>

        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <button
              className="btn btn-success w-100"
              onClick={handleBooking}
            >
              Book Now
            </button>

            {message && (
              <p className="mt-3 text-success fw-bold">{message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;