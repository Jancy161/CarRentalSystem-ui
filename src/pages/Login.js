/*import React, { useState } from "react";
import { login } from "../services/authService";
import { fetchUserByEmail } from "../services/userService";
import { useNavigate } from "react-router-dom";
import http, { API_BASE } from "../services/http"; // ✅ to call reset-password API


export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);   // ✅ toggle reset form
  const [resetForm, setResetForm] = useState({ email: "", newPassword: "" });
 // ✅ states for reset form
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("What is your pet's name?");
  const [answer, setAnswer] = useState("");
  const [newPass, setNewPass] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onResetChange = (e) =>
    setResetForm({ ...resetForm, [e.target.name]: e.target.value });


  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      await login(form); // stores token + email
      // Get role via /api/users/getbyemail/{email}
      const email = form.username;
      const users = await fetchUserByEmail(email);
      const user = users?.[0];//for reserve list
      const role = users?.[0]?.role || "User";
      localStorage.setItem("user", JSON.stringify(user));//reserve list
      localStorage.setItem("role", role);
      //localStorage.setItem("token", res.data.token);

      setMsg({ type: "success", text: "Logged in" });
      navigate(role === "Admin" ? "/admin" : "/user");
    } catch (err) {
      setMsg({ type: "danger", text: err?.response?.data || "Login failed" });
    } finally { setLoading(false); }
  };
const handleReset = async (e) => {
    e.preventDefault();
    try {
      await http.put(`${API_BASE}/auth/reset-password`, {
  email,
  securityQuestion: question,
  securityAnswer: answer,
  newPassword: newPass
});
      setMsg({ type: "success", text: "Password reset successfully!" });
      setShowReset(false);
    } catch (err) {
      setMsg({
        type: "danger",
        text: err?.response?.data || "Reset failed. Wrong answer?",
      });
    }
  };

/*
  return (
    <div className="container py-4" style={{maxWidth: 420, backgroundColor: '#ddecddff'}}>
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
        <button className="btn btn-success w-100" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
        <div className="text-center mt-3">
          <a href="#" onClick={(e)=>e.preventDefault()}>Forgot password?</a>
        </div>
      </form>
    </div>
  );
}*/
/* 
  return (
    <div className="container py-4" style={{ maxWidth: 420, backgroundColor: '#ddecddff' }}>
      <h2 className="mb-3">Login</h2>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      {!showReset ? (
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="username"
              className="form-control"
              value={form.username}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={onChange}
              required
            />
          </div>
          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
          <div className="text-center mt-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowReset(true);
              }}
            >
              Forgot password?
            </a>
          </div>
        </form>
      ) : (
        <form onSubmit={handleReset}>
          <h5 className="mb-3">Reset Password</h5>
          <input
            type="email"
            placeholder="Enter email"
            className="form-control mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            className="form-control mb-2"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          >
            <option>What is your pet's name?</option>
            <option>What is your favorite color?</option>
            <option>What is your birthplace?</option>
          </select>
          <input
            type="text"
            placeholder="Answer"
            className="form-control mb-2"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="form-control mb-2"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
          />
          <button className="btn btn-primary w-100">Reset Password</button>
          <div className="text-center mt-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowReset(false);
              }}
            >
              Back to login
            </a>
          </div>
        </form>
      )}
    </div>
  );
}

*/
import React, { useState } from "react";
import { login } from "../services/authService";
import { fetchUserByEmail } from "../services/userService";
import { useNavigate } from "react-router-dom";
import http, { API_BASE } from "../services/http";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false); // toggle reset form
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const navigate = useNavigate();

  // handle login input change
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // handle login submit
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      await login(form); // stores token + email
      const emailVal = form.username;
      const users = await fetchUserByEmail(emailVal);
      const user = users?.[0];
      const role = user?.role || "User";

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", role);

      setMsg({ type: "success", text: "Logged in" });
      navigate(role === "Admin" ? "/admin" : "/user");
    } catch (err) {
      setMsg({ type: "danger", text: err?.response?.data || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  // handle simple password reset
  const handleSimpleReset = async (e) => {
    e.preventDefault();
    try {
      await http.put(`${API_BASE}/auth/reset-password`, {
        email,
        newPassword: newPass,
      });
      setMsg({ type: "success", text: "Password reset successfully!" });
      setShowReset(false);
    } catch (err) {
      setMsg({ type: "danger", text: err?.response?.data || "Reset failed" });
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 420, backgroundColor: '#ddecddff' }}>
      <h2 className="mb-3">Login</h2>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      {!showReset ? (
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="username"
              className="form-control"
              value={form.username}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={onChange}
              required
            />
          </div>
          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
          <div className="text-center mt-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowReset(true);
                setMsg(null);
              }}
            >
              Forgot password?
            </a>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSimpleReset}>
          <h5 className="mb-3">Reset Password</h5>
          <input
            type="email"
            placeholder="Enter email"
            className="form-control mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="form-control mb-2"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
          />
          <button className="btn btn-primary w-100">Reset Password</button>
          <div className="text-center mt-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowReset(false);
                setMsg(null);
              }}
            >
              Back to login
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
