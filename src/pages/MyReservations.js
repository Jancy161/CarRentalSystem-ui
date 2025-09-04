import React, { useEffect, useState } from "react";
import { getReservationByUserId, deleteReservationById } from "../services/reservationService";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // get logged in user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")); 
  const loggedInUserId = storedUser?.userId;  // make sure your backend gives "userId"

  useEffect(() => {
    async function fetchData() {
      try {
        if (!loggedInUserId) {
          console.error("No logged in user found.");
          setLoading(false);
          return;
        }

        const res = await getReservationByUserId(loggedInUserId);
        setReservations(Array.isArray(res) ? res : [res]);
      } catch (err) {
        console.error("Error fetching reservations:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [loggedInUserId]);

  const handleDelete = async (reservationId) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      try {
        await deleteReservationById(reservationId);
        setReservations(reservations.filter(r => r.reservationId !== reservationId));
        alert("Reservation deleted successfully!");
      } catch (err) {
        console.error("Error deleting reservation:", err);
        alert("Failed to delete reservation.");
      }
    }
  };

  if (loading) return <p>Loading reservations...</p>;

  return (
    <div className="container py-4">
      <h2>My Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className="row">
          {reservations.map(res => (
            <div key={res.reservationId} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Reservation #{res.reservationId}</h5>
                  <p><strong>Car:</strong> {res.car?.model}</p>
                  <p><strong>Pickup:</strong> {res.pickupDate}</p>
                  <p><strong>Dropoff:</strong> {res.dropoffDate}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(res.reservationId)}
                  >
                    Delete Reservation
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
