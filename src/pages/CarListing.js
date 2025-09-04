import React, { useEffect, useState } from "react";
import { getAllCars, getByBrand } from "../services/carService";
import { useNavigate } from "react-router-dom";

export default function CarListing() {
  const [cars, setCars] = useState([]);
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const data = brand ? await getByBrand(brand) : await getAllCars();
      setCars(data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []); // initial

  const search = async (e) => {
    e.preventDefault();
    load();
  };

  return (
    <div className="container-fluid py-4" style={{
          backgroundColor: '#ddecddff',}}>
      <h2>Available Cars</h2>
      <form className="row g-2 mb-3" onSubmit={search}>
        <div className="col-auto">
          <input className="form-control" placeholder="Search by brand (e.g. Toyota)" value={brand} onChange={(e)=>setBrand(e.target.value)} />
        </div>
        <div className="col-auto">
          <button className="btn btn-outline-success" disabled={loading}>Search</button>
        </div>
      </form>

      {loading && <div className="alert alert-info">Loading...</div>}
      <div className="row g-3">
        {cars.map((c) => (
          <div key={c.carId} className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{c.brand} {c.model}</h5>
                <p className="card-text">₹{c.pricePerDay} / day</p>
                <span className={`badge ${c.availability === 'AVAILABLE' ? 'bg-success' : 'bg-secondary'}`}>{c.availability}</span>
              </div>
              <div className="card-footer bg-transparent border-0">
                <button className="btn btn-sm btn-primary" onClick={()=>navigate('/reserve', { state: { car: c }})} disabled={c.availability !== 'AVAILABLE'}>Reserve</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}