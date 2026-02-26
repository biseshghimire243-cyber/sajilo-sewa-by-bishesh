import { useState } from "react";
import axios from "axios";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/contact", form)
      .then(res => {
        setResponseMsg(res.data.msg);
        setForm({ name: "", email: "", message: "" });
      })
      .catch(err => setResponseMsg("Failed to send message"));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            className="form-control mb-3"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="btn btn-primary w-100">Send Message</button>
        </form>
        {responseMsg && <p className="mt-3 text-success fw-bold">{responseMsg}</p>}
      </div>
    </div>
  );
}

export default Contact;