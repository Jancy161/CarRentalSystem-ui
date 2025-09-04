import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { isAuthenticated, logout, getRole } from "../services/authService";

export default function Navbar() {
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const role = getRole();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-success bg-success">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
         <img 
    src={logo} 
    alt="RoadReady" 
    width="50" 
    height="40" 
    className="me-2 rounded-circle" 
    style={{ objectFit: "cover" }} 
  />
  RoadReady
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/cars" className="nav-link">Cars</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {!authed && (
              <>
                <li className="nav-item"><NavLink to="/register" className="nav-link">Register</NavLink></li>
                <li className="nav-item"><NavLink to="/login" className="nav-link">Login</NavLink></li>
              </>
            )}
            {authed && role === "User" && (
              <li className="nav-item"><NavLink to="/user" className="nav-link">User Dashboard</NavLink></li>
            )}
            {authed && role === "Admin" && (
              <li className="nav-item"><NavLink to="/admin" className="nav-link">Admin Dashboard</NavLink></li>
            )}
            {authed && (
            <>
              
              <li className="nav-item">
              <NavLink to="/profile" className="nav-link">Profile</NavLink>
              </li>
              <li className="nav-item"><button onClick={handleLogout} className="btn btn-outline-light ms-2">Logout</button></li>
            </>
            )}
            {/*{authed && (
  <>
    <li className="nav-item">
      <NavLink to="/profile" className="nav-link">Profile</NavLink>
    </li>
    {role === "User" && (
      <li className="nav-item">
        <NavLink to="/user" className="nav-link">User Dashboard</NavLink>
      </li>
    )}
    {role === "Admin" && (
      <li className="nav-item">
        <NavLink to="/admin" className="nav-link">Admin Dashboard</NavLink>
      </li>
    )}
    <li className="nav-item">
      <button onClick={handleLogout} className="btn btn-outline-dark ms-2">Logout</button>
    </li>
  </>
)}*/}

          </ul>
        </div>
      </div>
    </nav>
  );
}