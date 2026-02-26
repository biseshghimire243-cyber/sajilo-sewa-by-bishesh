const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Services Data
// server.js

// server.js

// server.js

let services = [
  { id: 1, name: "Electrician", description: "Wiring, switch repair, and installation services.", contact: "9800000001", image: "/images/electrician.jpg" },
  { id: 2, name: "Plumber", description: "Pipe installation, leakage repair, and water systems.", contact: "9800000002", image: "/images/plumber.jpg" },
  { id: 3, name: "Mechanic", description: "Vehicle repair and maintenance services.", contact: "9800000003", image: "/images/mechanic.jpg" },
  { id: 4, name: "Carpenter", description: "Furniture making, repair, and woodwork services.", contact: "9800000004", image: "/images/carpenter.jpg" },
  { id: 5, name: "Painter", description: "House painting, wall finishing, and color consultation.", contact: "9800000005", image: "/images/painter.jpg" },
  { id: 6, name: "Cleaner", description: "Home, office, and commercial cleaning services.", contact: "9800000006", image: "/images/cleaner.jpg" },
  { id: 7, name: "Gardener", description: "Lawn care, tree trimming, and garden maintenance.", contact: "9800000007", image: "/images/gardener.jpg" },
  { id: 8, name: "Roofer", description: "Roof installation, leak repair, and maintenance.", contact: "9800000008", image: "/images/roofer.jpg" },
  { id: 9, name: "Mover", description: "Home and office moving services, packing/unpacking.", contact: "9800000009", image: "/images/mover.jpg" },
  { id: 10, name: "Locksmith", description: "Key duplication, lock repair, and emergency lockout services.", contact: "9800000010", image: "/images/locksmith.jpg" },
  { id: 11, name: "AC Technician", description: "AC installation, repair, and maintenance services.", contact: "9800000011", image: "/images/ac.jpg" },
  { id: 12, name: "Plasterer", description: "Wall plastering, ceiling finishing, and decorative work.", contact: "9800000012", image: "/images/plasterer.jpg" },
  { id: 13, name: "Electrician Helper", description: "Assists electricians in wiring and small tasks.", contact: "9800000013", image: "/images/electrician-helper.jpg" },
  { id: 14, name: "Car Washer", description: "Exterior and interior car cleaning and detailing.", contact: "9800000014", image: "/images/car-washer.jpg" },
  { id: 15, name: "Internet Technician", description: "Wi-Fi setup, modem installation, and troubleshooting.", contact: "9800000015", image: "/images/internet.jpg" },
  { id: 16, name: "Pest Control", description: "Termite, rodent, and insect control services.", contact: "9800000016", image: "/images/pest.jpg" },
  { id: 17, name: "Handyman", description: "Minor home repairs, installations, and fixes.", contact: "9800000017", image: "/images/handyman.jpg" },
  { id: 18, name: "Welder", description: "Metal welding, repair, and fabrication services.", contact: "9800000018", image: "/images/welder.jpg" },
  { id: 19, name: "Window Cleaner", description: "Residential and commercial window cleaning services.", contact: "9800000019", image: "/images/window-cleaner.jpg" },
  { id: 20, name: "Appliance Repair", description: "Repair for refrigerators, washing machines, and other appliances.", contact: "9800000020", image: "/images/appliance.jpg" }
];

// ✅ Home Route
app.get("/", (req, res) => {
  res.send("Sajilo Sewa Backend Running 🚀");
});

// ✅ GET All Services
app.get("/services", (req, res) => {
  res.json(services);
});

// ✅ GET Single Service
app.get("/services/:id", (req, res) => {
  const service = services.find(s => s.id == req.params.id);
  if (!service) return res.status(404).json({ msg: "Service not found" });
  res.json(service);
});

// ✅ Booking System
let bookings = [];

app.post("/book", (req, res) => {
  const { serviceId, name, phone } = req.body;

  if (!serviceId || !name || !phone) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const service = services.find(s => s.id == serviceId);
  if (!service) {
    return res.status(404).json({ msg: "Service not found" });
  }

  const booking = {
    id: bookings.length + 1,
    serviceId,
    serviceName: service.name,
    name,
    phone
  };

  bookings.push(booking);

  res.json({ msg: "Booking successful", booking });
});

// ✅ Contact Form
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ msg: "All fields required" });
  }

  console.log("Contact Form Submitted:", { name, email, message });
  res.json({ msg: "Message received successfully" });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});