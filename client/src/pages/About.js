// src/components/Testimonials.jsx
import React from "react";

function Testimonials() {
  const reviews = [
    { name: "Sita K.", msg: "Excellent electrician service!" },
    { name: "Ram B.", msg: "Plumber fixed our leakage quickly." },
    { name: "Mina L.", msg: "Mechanic is professional and on time." }
  ];

  return (
    <div className="p-5 bg-light">
      <h2 className="text-center mb-4">Customer Reviews</h2>
      <div className="d-flex justify-content-around flex-wrap">
        {reviews.map((r, idx) => (
          <div key={idx} className="card p-3 m-2 shadow-sm" style={{ minWidth: "250px" }}>
            <p>"{r.msg}"</p>
            <h6 className="text-end">- {r.name}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;