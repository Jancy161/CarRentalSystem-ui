import React, { useState } from "react";
import { register } from "../services/authService";

export default function Register() {
  const [form, setForm] = useState({ userId: 1, name: "", email: "", password: "", role: "User" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const data = await register(form);
      setMsg({ type: "success", text: data || "Registered successfully. Please login." });
    } catch (err) {
      setMsg({ type: "danger", text: err?.response?.data || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4" style={{maxWidth: 520}}>
      <h2 className="mb-3">Create account</h2>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <form onSubmit={submit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label className="form-label">User ID (1-99)</label>
          <input required type="number" min={1} max={99} className="form-control" name="userId" value={form.userId} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input required className="form-control" name="name" value={form.name} onChange={onChange} placeholder="John" />
          <div className="form-text">Must match regex: [A-Z][a-z]</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input required type="email" className="form-control" name="email" value={form.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input required type="password" className="form-control" name="password" value={form.password} onChange={onChange} />
          <div className="form-text">Regex: [A-Z]...[a-z]</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-select" name="role" value={form.role} onChange={onChange}>
            <option>User</option>
            <option>Admin</option>
          </select>
        </div>
        <button className="btn btn-primary w-100" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>
    </div>
  );
}
