// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CarListing from "./pages/CarListing";
import ReservationPage from "./pages/ReservationPage";
import MyReservations from "./pages/MyReservations";
import PaymentPage from "./pages/PaymentPage";
import FeedbackPage from "./pages/FeedbackPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cars" element={<CarListing />} />
          <Route
  path="/profile"
  element={
    <ProtectedRoute roles={["User", "Admin"]}>
      <UserProfile />
    </ProtectedRoute>
  }
/>
          {/* Protected routes (requires token) */}
          <Route
            path="/reserve"
            element={
              <ProtectedRoute roles={["User", "Admin"]}>
                <ReservationPage />
              </ProtectedRoute>
            }
          />
          <Route path="/payments/:reservationId" element={<PaymentPage />} />

          <Route path="/myreservations" element={<MyReservations />} />
          <Route
            path="/payments"
            element={
              <ProtectedRoute roles={["User", "Admin"]}>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute roles={["User", "Admin"]}>
                <FeedbackPage />
              </ProtectedRoute>
            }
          />

          {/* Role-specific dashboards */}
          <Route
            path="/user"
            element={
              <ProtectedRoute roles={["User"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
