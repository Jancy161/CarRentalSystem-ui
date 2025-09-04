
// src/pages/UserProfile.js with edit functionality
/*import React, { useEffect, useState } from "react";
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
*/

// src/pages/UserProfile.js
import React, { useEffect, useState } from "react";
import { fetchUserByEmail, updateUser } from "../services/userService";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ 
    userId: 1, 
    name: "", 
    email: "", 
    password: "",
    role: "User" 
  });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Load user profile on component mount
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setLoading(true);
      fetchUserByEmail(email)
        .then((res) => {
          const userData = Array.isArray(res) ? res[0] : res;
          setUser(userData);
          setForm({ 
            userId: userData.userId,
            name: userData.name, 
            email: userData.email, 
            password: "", // Don't populate password field
            role: userData.role 
          });
        })
        .catch((error) => {
          console.error("Failed to fetch user:", error);
          setUser(null);
          setMsg({ type: "danger", text: "Failed to load profile" });
        })
        .finally(() => setLoading(false));
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: null });
    }
  };

  // Validate form fields based on backend validation patterns
  const validateForm = () => {
    const errors = {};

    // Name validation: [A-Z][a-z]{1,15}
    const namePattern = /^[A-Z][a-z]{1,15}$/;
    if (!form.name.trim()) {
      errors.name = "Name is required";
    } else if (!namePattern.test(form.name)) {
      errors.name = "Name must start with uppercase letter followed by 1-15 lowercase letters";
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(form.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation: uppercase,lowercase,spl.char, digit(only if password is being changed)
    if (form.password.trim()) {
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(form.password)) {
        errors.password = "Password must start with uppercase letter and end with 1-3 lowercase letters";
      }
      if (form.password.length < 4) {
        errors.password = "Password must be at least 4 characters long";
      }
    }

    // Role validation
    if (!["User", "Admin"].includes(form.role)) {
      errors.role = "Role must be either 'User' or 'Admin'";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle save button click
  const handleSave = async (e) => {
    e.preventDefault();
    setMsg(null);

    // Validate form
    if (!validateForm()) {
      setMsg({ type: "danger", text: "Please fix the validation errors" });
      return;
    }

    setLoading(true);
    try {
      // Prepare update payload
      const updatePayload = {
        userId: form.userId,
        name: form.name,
        email: form.email,
        password: form.password.trim() ? form.password : user.password, // Keep old password if not changed
        role: form.role,
      };

      const updatedUser = await updateUser(user.userId, updatePayload);
      setUser(updatedUser);
      setEditing(false);
      
      // Update localStorage if email changed
      if (form.email !== localStorage.getItem("email")) {
        localStorage.setItem("email", form.email);
      }
      
      setMsg({ type: "success", text: "Profile updated successfully!" });
      
      // Clear password field after successful update
      setForm({ ...form, password: "" });
    } catch (err) {
      console.error("Update failed:", err);
      const errorMessage = err.response?.data || err.message || "Update failed!";
      setMsg({ type: "danger", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditing(false);
    setValidationErrors({});
    setMsg(null);
    // Reset form to original user data
    setForm({ 
      userId: user.userId,
      name: user.name, 
      email: user.email, 
      password: "",
      role: user.role 
    });
  };

  // Loading state
  if (loading && !user) {
    return (
      <div className="container mt-4" style={{
          backgroundColor: '#ddecddff'}}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No user found state
  if (!user) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-warning text-center">
              <h4>No profile found</h4>
              <p>Please try logging in again.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h3 className="card-title mb-0">
                <i className="fas fa-user me-2"></i>My Profile
              </h3>
            </div>
            <div className="card-body">
              {/* Alert Messages */}
              {msg && (
                <div className={`alert alert-${msg.type} alert-dismissible fade show`} role="alert">
                  {msg.text}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setMsg(null)}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              {!editing ? (
                /* Display Mode */
                <div style={{
          backgroundColor: '#ddecddff',}}>
                  <div className="row mb-3" >
                    <div className="col-sm-3">
                      <strong>User ID:</strong>
                    </div>
                    <div className="col-sm-9">
                      <span className="badge bg-success">{user.userId}</span>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <strong>Name:</strong>
                    </div>
                    <div className="col-sm-9">{user.name}</div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <strong>Email:</strong>
                    </div>
                    <div className="col-sm-9">{user.email}</div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-sm-3">
                      <strong>Role:</strong>
                    </div>
                    <div className="col-sm-9">
                      <span className={`badge ${user.role === 'Admin' ? 'bg-danger' : 'bg-success'}`}>
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      className="btn btn-success"
                      onClick={() => setEditing(true)}
                    >
                      <i className="fas fa-edit me-2"></i>Edit Profile
                    </button>
                  </div>
                </div>
              ) : (
                /* Edit Mode */
                <form onSubmit={handleSave} style={{
          backgroundColor: '#ddecddff',}}>
                  <div className="mb-3" >
                    <label htmlFor="userId" className="form-label">
                      User ID <span className="text-muted">(Read-only)</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="userId"
                      name="userId"
                      value={form.userId}
                      disabled
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                    {validationErrors.name && (
                      <div className="invalid-feedback">{validationErrors.name}</div>
                    )}
                    <div className="form-text">
                      Must start with uppercase letter followed by 1-15 lowercase letters
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                    {validationErrors.email && (
                      <div className="invalid-feedback">{validationErrors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      New Password <span className="text-muted">(Leave blank to keep current)</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                    />
                    {validationErrors.password && (
                      <div className="invalid-feedback">{validationErrors.password}</div>
                    )}
                    <div className="form-text">
                      Password must contain uppercase, lowercase, digit, and special character
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="role" className="form-label">
                      Role <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${validationErrors.role ? 'is-invalid' : ''}`}
                      id="role"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                    {validationErrors.role && (
                      <div className="invalid-feedback">{validationErrors.role}</div>
                    )}
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      <i className="fas fa-times me-2"></i>Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
