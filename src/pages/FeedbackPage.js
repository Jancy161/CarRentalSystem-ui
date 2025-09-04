import React, { useEffect, useState } from "react";
import { addFeedback, getAllFeedback, getFeedbacksOrderByRating } from "../services/feedbackService";

export default function FeedbackPage() {
  const [form, setForm] = useState({ feedbackId: 1, userId: 1, carId: 5, rating: 5, comment: "" });
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState(null);

  const load = async () => {
    const data = await getAllFeedback();
    setList(data);
  };

  useEffect(() => { load(); }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await addFeedback(form);
      setMsg({ type: "success", text: "Feedback submitted" });
      load();
    } catch (err) {
      setMsg({ type: "danger", text: err?.response?.data || "Failed" });
    }
  };

  const sortByRating = async () => {
    const data = await getFeedbacksOrderByRating();
    setList(data);
  };

  return (
    <div className="container py-4">
      <h2>Feedback & Ratings</h2>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      <form onSubmit={submit} className="row g-3 mb-4">
        <div className="col-md-2"> <label className="form-label">Feedback ID</label><input className="form-control" type="number" name="feedbackId" value={form.feedbackId} onChange={onChange} min={1} required /></div>
        <div className="col-md-2"><label className="form-label">User ID</label><input className="form-control" type="number" name="userId" value={form.userId} onChange={onChange} min={1}  required /></div>
        <div className="col-md-2"> <label className="form-label">Car ID</label><input className="form-control" type="number" name="carId" value={form.carId} onChange={onChange} min={5}  required /></div>
       { /*<div className="col-md-2">
          <select className="form-select" name="rating" value={form.rating} onChange={onChange}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>*/}
        <div className="col-md-2">
  <label className="form-label">Rating</label>
  <select
    className="form-select"
    name="rating"
    value={form.rating}
    onChange={onChange}
  >
    <option value="">Select rating</option>
    <option value="1">1 - Poor</option>
    <option value="2">2 - Fair</option>
    <option value="3">3 - Good</option>
    <option value="4">4 - Very Good</option>
    <option value="5">5 - Excellent</option>
  </select>
</div>
        <div className="col-md-4">  <label className="form-label">Comments</label><input className="form-control" name="comment" value={form.comment} onChange={onChange} placeholder="Your experience..." required /></div>
        <div className="col-12"><button className="btn btn-primary">Submit</button></div>
      </form>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="m-0">All Feedback</h5>
        <button className="btn btn-sm btn-outline-secondary" onClick={sortByRating}>Sort by rating</button>
      </div>
      <div className="list-group">
        {list.map(f => (
          <div key={f.feedbackId} className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
              {/*<h6>User #{f.userId} on Car #{f.carId}</h6>*/}
<h6 className="mb-1">
  User #{f.userId} on Car #{f.carId}
</h6>
              <span className="badge bg-primary">{f.rating}★</span>
            </div>
            <p className="mb-1">{f.comment}</p>
          </div>
        ))}
        {list.length === 0 && <div className="alert alert-warning">No feedback yet.</div>}
      </div>
    </div>
  );
}
