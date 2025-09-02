import React, { useState } from "react";
import { login } from "../services/authService";
import { fetchUserByEmail } from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      await login(form); // stores token + email
      // Get role via /api/users/getbyemail/{email}
      const email = form.username;
      const users = await fetchUserByEmail(email);
      const role = users?.[0]?.role || "User";
      localStorage.setItem("role", role);
      setMsg({ type: "success", text: "Logged in" });
      navigate(role === "Admin" ? "/admin" : "/user");
    } catch (err) {
      setMsg({ type: "danger", text: err?.response?.data || "Login failed" });
    } finally { setLoading(false); }
  };

  return (
    <div className="container py-4" style={{maxWidth: 420}}>
      <h2 className="mb-3">Login</h2>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="username" className="form-control" value={form.username} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" value={form.password} onChange={onChange} required />
        </div>
        <button className="btn btn-primary w-100" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
        <div className="text-center mt-3">
          <a href="#" onClick={(e)=>e.preventDefault()}>Forgot password?</a>
        </div>
      </form>
    </div>
  );
}
