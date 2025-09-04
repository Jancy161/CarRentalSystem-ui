import React, { useState } from "react";
import { register } from "../services/authService";

export default function Register() {
  const [form, setForm] = useState({ userId: 1, name: "", email: "", password: "", role: "User" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);

    // Frontend validations
  if (!form.name.match(/^[A-Z][a-z]{1,}$/)) {
    setMsg({ type: "danger", text: "Name must start with a capital letter followed by lowercase letters." });
    return;
  }

  if (!form.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/)) {
    setMsg({ type: "danger", text: "Password must have uppercase, lowercase, number, and special character." });
    return;
  }

  if (form.userId < 1) {
    setMsg({ type: "danger", text: "User ID must be at least 1." });
    return;
  }
    setLoading(true);
    
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
    <div className="container py-4" style={{maxWidth: 520 ,
          backgroundColor: '#ddecddff'}}>
      <h2 className="mb-3">Create account</h2>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <form onSubmit={submit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label className="form-label">User ID (min 1)</label>
          <input required type="number" min={1}  className="form-control" name="userId" value={form.userId} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input required className="form-control" name="name" value={form.name} onChange={onChange} placeholder="John" />
          <div className="form-text">[A-Z][a-z]</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input required type="email" className="form-control" name="email" value={form.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input required type="password" className="form-control" name="password" value={form.password} onChange={onChange} />
          <div className="form-text">Password must contain uppercase, lowercase, digit, and special character</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-select" name="role" value={form.role} onChange={onChange}>
            <option>User</option>
            <option>Admin</option>
          </select>
        </div>
        <button className="btn btn-success w-100" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>
    </div>
  );
}
