/*import React, { useEffect, useState } from "react";
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
}*/
import React, { useEffect, useState } from "react";
import { getAllCars, getAffordableSorted } from "../services/carService";
import { Link } from "react-router-dom";
import thar4 from "../assets/thar4.jpg";
import Navbar from "../components/Navbar";

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
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div style={{backgroundColor: '#f1f6fcff', minHeight: '100vh' }}>
      <div className="container-fluid p-0 ">
        {/* Hero Section */}
        <div 
          //className="p-5 mb-5 rounded-4 shadow-lg position-relative overflow-hidden"
          className="w-100 vh-100 d-flex justify-content-center align-items-center position-relative overflow-hidden"
          style={{
          backgroundImage: `url(${thar4})`,
          
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white"
        }}
        >

          
          <div className="container-fluid py-4">
            <div className="row align-items-center mt-n2">
              <div className="col-lg-8" style={{ marginTop: "-4rem" }}>
                <h1 className="display-4 fw-bold mb-3 ">
                  Find Your <span style={{ color: '#1a712fff' }}>Perfect Ride</span>
                </h1>
                <p className="fs-5 mb-4 text-light opacity-75" style={{ color: "white",marginTop: "3rem" }}>
                  Browse premium vehicles, make instant reservations, secure payments, and share your experience — all in one seamless platform.
                </p>

                <Link 
                  to="/cars" 
                  className="btn btn-light btn-lg px-4 py-3 shadow"
                  style={{ fontSize: '1.1rem',marginTop: "6rem" }}
                >
                  <i className="fas fa-car me-2"></i>
                  Browse Our Fleet
                </Link>
              </div>
              <div className="col-lg-4 text-end d-none d-lg-block">
                {/*<div 
                  className="rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{
                    width: '120px',
                    height: '120px',
                    background: 'rgba(13, 110, 253, 0.1)',
                    border: '3px solid rgba(13, 110, 253, 0.3)'
                  }} 
                >
                  <i className="fas fa-road" style={{ fontSize: '3rem', color: '#0d6efd' }}></i>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Budget Filter Section */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body bg-white rounded-3">
            <div className="row align-items-end g-3">
              <div className="col-auto">
                <label className="form-label fw-semibold text-dark mb-2">
                  <i className="fas fa-rupee-sign me-2 text-primary"></i>
                  Daily Budget Filter
                </label>
              </div>
              <div className="col-md-3 col-sm-4">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fas fa-rupee-sign text-muted"></i>
                  </span>
                  <input 
                    type="number" 
                    className="form-control border-start-0 shadow-sm" 
                    value={budget} 
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Enter budget"
                    style={{ fontSize: '1rem' }}
                  />
                </div>
              </div>
              <div className="col-auto">
                <button 
                  className="btn btn-outline-success px-4 py-2 rounded-pill shadow-sm" 
                  onClick={applyBudget} 
                  disabled={loading}
                  style={{ minWidth: '140px' }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Filtering...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-filter me-2"></i>
                      Apply Filter
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="alert alert-info border-0 shadow-sm rounded-3 d-flex align-items-center">
            <div className="spinner-border text-info me-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div>
              <h6 className="mb-0 text-info fw-semibold">Loading Available Cars...</h6>
              <small className="text-muted">Please wait while we fetch the latest inventory</small>
            </div>
          </div>
        )}

        {/* Cars Grid */}
        <div className="row g-4" style={{
          backgroundColor: '#ddecddff',}}>
          {cars.map((c) => (
            <div key={c.carId} className="col-lg-4 col-md-6">
              <div 
                className="card h-100 border-0 shadow-sm position-relative overflow-hidden"
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
                }}
              >
                {/* Card Header with Availability Badge */}
                <div className="position-absolute top-0 end-0 m-3" style={{ zIndex: 2 }}>
                  <span 
                    className={`badge px-3 py-2 rounded-pill fw-normal ${
                      c.availability === 'AVAILABLE' 
                        ? 'bg-success' 
                        : 'bg-secondary'
                    }`}
                    style={{ fontSize: '0.75rem' }}
                  >
                    {c.availability === 'AVAILABLE' ? (
                      <>
                        <i className="fas fa-check-circle me-1"></i>
                        Available
                      </>
                    ) : (
                      <>
                        <i className="fas fa-clock me-1"></i>
                        {c.availability}
                      </>
                    )}
                  </span>
                </div>

                <div className="card-body p-4">
                  <div className="d-flex align-items-start mb-3">
                   {/*} <div 
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: '#f8f9fa',
                        border: '2px solid #e9ecef'
                      }}
                    >
                      <i className="fas fa-car text-primary" style={{ fontSize: '1.2rem' }}></i>
                    </div>  */}
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-1 fw-bold text-dark">
                        {c.brand}
                      </h5>
                      <p className="text-muted mb-0 fw-medium">{c.model}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                      <span className="text-muted small">Daily Rate</span>
                      <div className="d-flex align-items-center">
                        <span className="fs-4 fw-bold text-success me-1">₹{c.pricePerDay}</span>
                        <span className="text-muted">/day</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-footer bg-transparent border-0 p-4 pt-0">
                  <Link to= "/cars" 
                    className="btn btn-success w-100 py-2 rounded-pill shadow-sm"
                    style={{ fontSize: '0.95rem', fontWeight: '500' }}
                  >
                    <i className="fas fa-eye me-2"></i>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && cars.length === 0 && (
          <div className="text-center py-5">
            <div className="card border-0 shadow-sm bg-light">
              <div className="card-body py-5">
                <div 
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'rgba(108, 117, 125, 0.1)'
                  }}
                >
                  <i className="fas fa-search text-muted" style={{ fontSize: '2rem' }}></i>
                </div>
                <h4 className="text-muted mb-3">No Cars Found</h4>
                <p className="text-muted mb-4">
                  We couldn't find any cars matching your current criteria. 
                  Try adjusting your budget filter or check back later.
                </p>
                <button 
                  className="btn btn-outline-success px-4 py-2 rounded-pill"
                  onClick={() => {
                    setBudget(2000);
                    getAllCars().then(setCars);
                  }}
                >
                  <i className="fas fa-refresh me-2"></i>
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}