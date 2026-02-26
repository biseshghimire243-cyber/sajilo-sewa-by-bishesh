const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sajilo Sewa Backend Running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
let bookings = []; // store bookings temporarily

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
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ msg: "All fields required" });
  }
  console.log("Contact Form Submitted:", { name, email, message });
  res.json({ msg: "Message received successfully" });
});


