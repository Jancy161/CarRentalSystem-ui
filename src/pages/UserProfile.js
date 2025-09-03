// src/pages/UserProfile.js
/*import React, { useEffect, useState } from "react";
import { fetchUserByEmail } from "../services/userService";

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      fetchUserByEmail(email)
        .then((res) => {
          // API returns a list, pick first
          setUser(res[0]);
        })
        .catch(() => setUser(null));
    }
  }, []);

  if (!user) {
    return (
      <div className="container py-4 text-center">
        <h3>No profile found</h3>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Profile</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <p><strong>User ID:</strong> {user.userId}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>
    </div>
  );
}
*/
// src/pages/UserProfile.js
import React, { useEffect, useState } from "react";
import { fetchUserByEmail, updateUser } from "../services/userService";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      fetchUserByEmail(email)
        .then((res) => {
          const u = Array.isArray(res) ? res[0] : res;
          setUser(u);
          setForm({ name: u.name, email: u.email, password: "" });
        })
        .catch(() => setUser(null));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateUser(user.userId, {
        ...user,
        name: form.name,
        email: form.email,
        password: form.password || user.password, // keep old if not changed
        role: user.role,
      });
      setUser(updated);
      setEditing(false);
      setMsg({ type: "success", text: "Profile updated!" });
    } catch (err) {
      setMsg({ type: "danger", text: "Update failed!" });
    }
  };

  if (!user) {
    return (
      <div className="container py-4 text-center">
        <h3>No profile found</h3>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">My Profile</h2>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      {!editing ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <p><strong>User ID:</strong> {user.userId}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <button className="btn btn-primary mt-2" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <form className="card shadow-sm p-3" onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password (leave blank to keep current)</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
