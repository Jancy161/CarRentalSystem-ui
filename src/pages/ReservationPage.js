import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { addReservation } from "../services/reservationService";
import { useNavigate } from "react-router-dom";


export default function ReservationPage() {
  const location = useLocation();
  const user = location.state?.user;
  const car = location.state?.car;
  const [form, setForm] = useState({
    reservationId: 1,
    userId:user?.userId | 1,
    carId: car?.carId || 5,
    pickupDate: "",
    dropoffDate: "",
    totalAmount: 0,
    status: "ACTIVE"
  });
  const [msg, setMsg] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const calcAmount = () => {
    // Simple calc: assume 1 day minimum; real app would diff dates
    const price = car?.pricePerDay || 0;
    setForm((f) => ({ ...f, totalAmount: Number(price) }));
  };
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await addReservation(form);
      setMsg({ type: "success", text: `Reservation created (ID: ${data.reservationId})` });
       // ✅ Redirect to payments page with reservationId
      navigate(`/payments/${data.reservationId}`);
    } catch (err) {
      setMsg({ type: "danger", text: err?.response?.data || "Failed to create reservation" });
    }
  };

  return (
    <div className="container py-4" style={{maxWidth: 720, backgroundColor: '#ddecddff'}}>

      <h2>Reserve Car</h2>
      {car && <div className="alert alert-secondary">{car.brand} {car.model} — ₹{car.pricePerDay}/day</div>}
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <form onSubmit={submit} className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Reservation ID</label>
          <input type="number" className="form-control" name="reservationId" value={form.reservationId} onChange={onChange} min={1} required />
        </div>
        <div className="col-md-4">
          <label className="form-label">User ID (1)</label>
          <input type="number" className="form-control" name="userId" value={form.userId} onChange={onChange} min={1}  required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Car ID (5)</label>
          <input type="number" className="form-control" name="carId" value={form.carId} onChange={onChange} min={5}  required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Pickup Date (MM/DD/YYYY)</label>
          <input className="form-control" name="pickupDate" value={form.pickupDate} onChange={onChange} placeholder="08/30/2025" required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Drop-off Date (MM/DD/YYYY)</label>
          <input className="form-control" name="dropoffDate" value={form.dropoffDate} onChange={onChange} placeholder="09/02/2025" required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Total Amount</label>
          <div className="input-group">
            <span className="input-group-text">₹</span>
            <input type="number" className="form-control" name="totalAmount" value={form.totalAmount} onChange={onChange} />
            <button className="btn btn-outline-secondary" type="button" onClick={calcAmount}>Auto</button>
          </div>
        </div>
        <div className="col-md-4">
          <label className="form-label">Status</label>
          <select className="form-select" name="status" value={form.status} onChange={onChange}>
            <option>ACTIVE</option>
            <option>CANCELLED</option>
            <option>COMPLETED</option>
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-success">Create Reservation</button>
        </div>
      </form>
    </div>
  );
}
