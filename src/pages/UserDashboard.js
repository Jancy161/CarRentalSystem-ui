import React from "react";
import { Link } from "react-router-dom";
import thar from "../assets/thar.webp";

export default function UserDashboard() {
  return (
    <div className="container-fluid py-4" style={{
          backgroundColor: '#ddecddff'}}>
      <h2 className="mb-3">User Dashboard</h2>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card h-100"><div className="card-body">
            <h5>Browse Cars</h5>
            <p>See all available cars and start a reservation.</p>
            <Link to="/cars" className="btn btn-success">Go</Link>
          </div></div>
        </div>
        <div className="col-md-4">
          <div className="card h-100"><div className="card-body">
            <h5>Reserve</h5>
            <p>Book a car for specific dates and times.</p>
            <Link to="/reserve" className="btn btn-success">Reserve</Link>
          </div></div>
        </div>
       <div className="col-md-4">
  <div className="card h-100">
    <div className="card-body">
      <h5>My Reservations</h5>
      <p>View and manage your bookings.</p>
      <Link to="/myreservations" className="btn btn-success">View</Link>
    </div>
  </div>
</div>
        <div className="col-md-4">
          <div className="card h-100"><div className="card-body">
            <h5>Payments</h5>
            <p>Pay for your reservations securely.</p>
            <Link to="/payments" className="btn btn-success">Pay</Link>
          </div></div>
        </div>
        <div className="col-md-4">
          <div className="card h-100"><div className="card-body">
            <h5>Feedback</h5>
            <p>Rate and review your rental experience.</p>
            <Link to="/feedback" className="btn btn-success">Write Feedback</Link>
          </div></div>
        </div>
      </div>
    </div>
  );
}