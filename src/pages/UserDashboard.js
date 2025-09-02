import React from "react";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  return (
    <div className="container py-4">
      <h2 className="mb-3">User Dashboard</h2>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card h-100"><div className="card-body">
            <h5>Browse Cars</h5>
            <p>See all available cars and start a reservation.</p>
            <Link to="/cars" className="btn btn-primary">Go</Link>
          </div></div>
        </div>
        <div className="col-md-4">
          <div className="card h-100"><div className="card-body">
            <h5>Reserve</h5>
            <p>Book a car for specific dates and times.</p>
            <Link to="/reserve" className="btn btn-primary">Reserve</Link>
          </div></div>
        </div>
        <div className="col-md-4">
          <div className="card h-100"><div className="card-body">
            <h5>Payments</h5>
            <p>Pay for your reservations securely.</p>
            <Link to="/payments" className="btn btn-primary">Pay</Link>
          </div></div>
        </div>
        <div className="col-md-4">
          <div className="card h-100"><div className="card-body">
            <h5>Feedback</h5>
            <p>Rate and review your rental experience.</p>
            <Link to="/feedback" className="btn btn-primary">Write Feedback</Link>
          </div></div>
        </div>
      </div>
    </div>
  );
}