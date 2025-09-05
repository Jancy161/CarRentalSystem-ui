import React, { useState } from "react";
import { addPayment } from "../services/paymentService";

export default function PaymentPage() {
  const [form, setForm] = useState({ paymentId: 1, reservationId: 1, amount: 0, method: "CARD", status: "SUCCESS" });
  const [msg, setMsg] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await addPayment(form);
      setMsg({ type: "success", text: `Payment saved (ID: ${data.paymentId})` });
    } catch (err) {
      setMsg({ type: "danger", text: err?.response?.data || "Payment failed" });
    }
  };

  return (
    <div className="container py-4" style={{maxWidth: 640,backgroundColor: '#ddecddff'}}>
      <h2>Make Payment</h2>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <form onSubmit={submit} className="row g-3">
        <div className="col-md-3">
          <label className="form-label">Payment ID</label>
          <input type="number" className="form-control" name="paymentId" value={form.paymentId} onChange={onChange} min={1} required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Reservation ID</label>
          <input type="number" className="form-control" name="reservationId" value={form.reservationId} onChange={onChange} required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Amount</label>
          <input type="number" className="form-control" name="amount" value={form.amount} onChange={onChange} min={0} step="0.01" required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Method</label>
          <select className="form-select" name="method" value={form.method} onChange={onChange}>
            <option>CARD</option>
            <option>UPI</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Status</label>
          <select className="form-select" name="status" value={form.status} onChange={onChange}>
            <option>SUCCESS</option>
            <option>FAILED</option>
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-success">Submit Payment</button>
        </div>
      </form>
    </div>
  );
}
