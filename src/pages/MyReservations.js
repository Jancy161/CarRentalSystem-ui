/*import React, { useEffect, useState } from "react";
import { getReservationsByUserId, cancelReservation, updateReservation } from "../services/reservationService";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
   // ✅ get userId safely
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;
  
  useEffect(() => {
    if (userId) load();
  }, []);

  const load = async () => {
    const userId = localStorage.getItem("userId");
    const data = await getReservationsByUserId(userId);
    setReservations(data);
  };

  const handleCancel = async (id) => {
    await cancelReservation(id);
    load();
  };

  return (
    <div className="container py-4">
      <h3>My Reservations</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>Car</th><th>Pickup</th><th>Dropoff</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(r => (
            <tr key={r.reservationId}>
              <td>{r.reservationId}</td>
              <td>{r.car?.model}</td>
              <td>{r.pickupDate}</td>
              <td>{r.dropoffDate}</td>
              <td>{r.status}</td>
              <td>
                {r.status === "ACTIVE" && (
                  <button className="btn btn-sm btn-danger" onClick={() => handleCancel(r.reservationId)}>
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
*/
import React, { useEffect, useState } from "react";
import { getReservationsByUserId, cancelReservation, updateReservation } from "../services/reservationService";
import { getCarById } from "../services/carService";  
export default function MyReservations() {
  const [reservations, setReservations] = useState([]);

  // ✅ get user safely from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    if (userId) loadReservations();
  }, [userId]);

  const loadReservations = async () => {
    try {
      const data = await getReservationsByUserId(userId);
      // Fetch car details 
       // enrich each reservation with car details
     /* const enriched = await Promise.all(
  data.map(async (res) => {
    if (!res.car) {
      try {
        // fetch full reservation details
        const fullRes = await getReservationsByUserId(res.reservationId);
        return { ...res, car: fullRes.car };   // ✅ now car.model exists
      } catch (err) {
        console.error(`Failed to fetch reservation ${res.reservationId}`, err);
        return res;
      }
    }
    return res;
  })
);
*/
      setReservations(data);
    } catch (err) {
      console.error("Failed to load reservations:", err);
    }
  };

  const handleCancel = async (reservationId) => {
    try {
      await cancelReservation(reservationId);
      loadReservations();
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  const handleModify = async (res) => {
    // Example: extend dropoff date by 1 day
    const updated = { ...res, dropoffDate: "2025-09-10" }; // replace with form input later
    try {
      await updateReservation(updated);
      loadReservations();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="container py-4">
      <h3>My Reservations</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Car</th>
            <th>Pickup</th>
            <th>Dropoff</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.reservationId}>
              <td>{r.reservationId}</td>

              <td>{r.carModel}</td>
              <td>{r.pickupDate}</td>
              <td>{r.dropoffDate}</td>
              <td>{r.status}</td>
              <td>
                {r.status === "ACTIVE" && (
                  <>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleModify(r)}
                    >
                      Modify
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleCancel(r.reservationId)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
