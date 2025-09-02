import React, { useEffect, useState } from "react";
import { getAllCars, getAffordableSorted } from "../services/carService";
import { Link } from "react-router-dom";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [budget, setBudget] = useState(2000);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllCars()
      .then(setCars)
      .finally(() => setLoading(false));
  }, []);

  const applyBudget = async () => {
    setLoading(true);
    try {
      const data = await getAffordableSorted(budget);
      setCars(data);
    } finally { setLoading(false); }
  };

  return (
    <div className="container py-4">
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Find your perfect ride</h1>
          <p className="col-md-8 fs-5">Browse, reserve, pay, and review — all in one place. Secure JWT auth.
          </p>
          <Link to="/cars" className="btn btn-primary btn-lg">Browse Cars</Link>
        </div>
      </div>

      <div className="row align-items-end g-3 mb-3">
        <div className="col-auto"><label className="form-label">Budget (price/day)</label></div>
        <div className="col-3">
          <input type="number" className="form-control" value={budget} onChange={(e)=>setBudget(e.target.value)} />
        </div>
        <div className="col-auto">
          <button className="btn btn-outline-primary" onClick={applyBudget} disabled={loading}>Filter Affordable</button>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading cars...</div>}

      <div className="row g-3">
        {cars.map((c) => (
          <div key={c.carId} className="col-md-4">
            <div className="card card-hover h-100">
              <div className="card-body">
                <h5 className="card-title">{c.brand} {c.model}</h5>
                <p className="card-text">₹{c.pricePerDay} / day</p>
                <span className={`badge ${c.availability === 'AVAILABLE' ? 'bg-success' : 'bg-secondary'}`}>{c.availability}</span>
              </div>
              <div className="card-footer bg-transparent border-0">
                <Link to={`/cars`} className="btn btn-sm btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
        {!loading && cars.length === 0 && (
          <div className="col-12"><div className="alert alert-warning">No cars found.</div></div>
        )}
      </div>
    </div>
  );
}