/*import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container text-center">
        <small>© {new Date().getFullYear()} RoadReady — Hexaware</small>
      </div>
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-outline-light mt-2"
      >
        ← Back
      </button>
    </footer>
  );
}*/
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container d-flex justify-content-between align-items-center">
        <small>© {new Date().getFullYear()} RoadReady — Hexaware</small>
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-outline-light btn-sm"
        >
          ← Back
        </button>
      </div>
    </footer>
  );
}
