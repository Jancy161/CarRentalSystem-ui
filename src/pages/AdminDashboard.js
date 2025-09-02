// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { addCar, updateCar, deleteCar, getAllCars } from "../services/carService";
import { getAllUsers } from "../services/userService";
import { getAllReservations, getByReservationGreaterThan } from "../services/reservationService";
import { getAllPayments, getByMethodAndStatus } from "../services/paymentService";

export default function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [carForm, setCarForm] = useState({ carId: 5, brand: "", model: "", pricePerDay: 1000, availability: "AVAILABLE" });
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [msg, setMsg] = useState(null);

  const loadAll = async () => {
    try {
      const [c, u, r, p] = await Promise.all([
        getAllCars().catch(() => []),
        getAllUsers().catch(() => []),
        getAllReservations().catch(() => []),
        getAllPayments().catch(() => []),
      ]);
      setCars(c);
      setUsers(u);
      setReservations(r);
      setPayments(p);
    } catch (err) {
      setMsg({ type: "danger", text: "Failed to load admin data" });
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line
  }, []);

  const onCarChange = (e) => setCarForm({ ...carForm, [e.target.name]: e.target.value });

  const addOrUpdateCar = async (e) => {
    e.preventDefault();
    try {
      const exists = cars.some((x) => Number(x.carId) === Number(carForm.carId));
      if (exists) {
        await updateCar(carForm);
        setMsg({ type: "success", text: "Car updated" });
      } else {
        await addCar(carForm);
        setMsg({ type: "success", text: "Car added" });
      }
      await loadAll();
    } catch (err) {
      setMsg({ type: "danger", text: err?.response?.data || "Save failed" });
    }
  };

  const removeCar = async (id) => {
    if (!window.confirm("Delete this car?")) return;
    try {
      await deleteCar(id);
      setMsg({ type: "success", text: "Deleted" });
      await loadAll();
    } catch (err) {
      setMsg({ type: "danger", text: err?.response?.data || "Delete failed" });
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Admin Dashboard</h2>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Manage Cars</h5>
          <form className="row g-2" onSubmit={addOrUpdateCar}>
            <div className="col-md-2">
              <input className="form-control" name="carId" value={carForm.carId} onChange={onCarChange} type="number" min={5} max={99} required />
            </div>
            <div className="col-md-2">
              <input className="form-control" name="brand" value={carForm.brand} onChange={onCarChange} placeholder="Brand (Capitalize)" required />
            </div>
            <div className="col-md-2">
              <input className="form-control" name="model" value={carForm.model} onChange={onCarChange} placeholder="Model (Capitalize)" required />
            </div>
            <div className="col-md-2">
              <input className="form-control" name="pricePerDay" value={carForm.pricePerDay} onChange={onCarChange} type="number" min={800} required />
            </div>
            <div className="col-md-2">
              <select className="form-select" name="availability" value={carForm.availability} onChange={onCarChange}>
                <option>AVAILABLE</option>
                <option>BOOKED</option>
              </select>
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100">Save</button>
            </div>
          </form>

          <div className="table-responsive mt-3">
            <table className="table table-sm table-striped align-middle">
              <thead><tr><th>ID</th><th>Brand</th><th>Model</th><th>₹/day</th><th>Avail</th><th></th></tr></thead>
              <tbody>
                {cars.map(c => (
                  <tr key={c.carId}>
                    <td>{c.carId}</td><td>{c.brand}</td><td>{c.model}</td><td>{c.pricePerDay}</td><td>{c.availability}</td>
                    <td><button className="btn btn-sm btn-outline-danger" onClick={()=>removeCar(c.carId)}>Delete</button></td>
                  </tr>
                ))}
                {cars.length === 0 && <tr><td colSpan={6} className="text-center">No cars found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-6">
          <div className="card h-100"><div className="card-body">
            <h5 className="card-title">Users</h5>
            <div className="table-responsive" style={{maxHeight: 260}}>
              <table className="table table-sm table-striped"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr></thead>
                <tbody>
                  {users.map(u => (<tr key={u.userId}><td>{u.userId}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>))}
                  {users.length === 0 && <tr><td colSpan={4} className="text-center">No users</td></tr>}
                </tbody>
              </table>
            </div>
          </div></div>
        </div>

        <div className="col-lg-6">
          <div className="card h-100"><div className="card-body">
            <h5 className="card-title">Reservations</h5>
            <div className="d-flex gap-2 mb-2">
              <button className="btn btn-sm btn-outline-secondary" onClick={async()=>setReservations(await getAllReservations())}>All</button>
              <button className="btn btn-sm btn-outline-secondary" onClick={async()=>setReservations(await getByReservationGreaterThan(2000))}>Total &gt; 2000</button>
            </div>
            <div className="table-responsive" style={{maxHeight: 260}}>
              <table className="table table-sm table-striped"><thead><tr><th>ID</th><th>User</th><th>Car</th><th>Pickup</th><th>Dropoff</th><th>Total</th><th>Status</th></tr></thead>
                <tbody>
                  {reservations.map(r => (
                    <tr key={r.reservationId}>
                      <td>{r.reservationId}</td><td>{r.userId}</td><td>{r.carId}</td><td>{r.pickupDate}</td><td>{r.dropoffDate}</td><td>{r.totalAmount}</td><td>{r.status}</td>
                    </tr>
                  ))}
                  {reservations.length === 0 && <tr><td colSpan={7} className="text-center">No reservations</td></tr>}
                </tbody>
              </table>
            </div>
          </div></div>
        </div>

        <div className="col-12">
          <div className="card h-100"><div className="card-body">
            <h5 className="card-title">Payments</h5>
            <div className="d-flex gap-2 mb-2">
              <button className="btn btn-sm btn-outline-secondary" onClick={async()=>setPayments(await getAllPayments())}>All</button>
              <button className="btn btn-sm btn-outline-secondary" onClick={async()=>setPayments(await getByMethodAndStatus('CARD','SUCCESS'))}>CARD & SUCCESS</button>
            </div>
            <div className="table-responsive">
              <table className="table table-sm table-striped"><thead><tr><th>ID</th><th>Res</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
                <tbody>
                  {payments.map(p => (<tr key={p.paymentId}><td>{p.paymentId}</td><td>{p.reservationId}</td><td>{p.amount}</td><td>{p.method}</td><td>{p.status}</td></tr>))}
                  {payments.length === 0 && <tr><td colSpan={5} className="text-center">No payments</td></tr>}
                </tbody>
              </table>
            </div>
          </div></div>
        </div>
      </div>
    </div>
  );
}

/*
import React, { useEffect, useState } from "react";
import { addCar, updateCar, deleteCar, getAllCars } from "../services/carService";
import { getAllUsers } from "../services/userService";
import { getAllReservations, getByReservationGreaterThan } from "../services/reservationService";
import { getAllPayments, getByMethodAndStatus } from "../services/paymentService";

export default function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [carForm, setCarForm] = useState({ carId: 5, brand: "", model: "", pricePerDay: 1000, availability: "AVAILABLE" });
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [msg, setMsg] = useState(null);

  const loadAll = async () => {
    const [c, u, r, p] = await Promise.all([
      getAllCars(),
      getAllUsers().catch(()=>[]),
      getAllReservations().catch(()=>[]),
      getAllPayments().catch(()=>[])
    ]);
    setCars(c); setUsers(u); setReservations(r); setPayments(p);
  };

  useEffect(() => { loadAll(); }, []);

  const onCarChange = (e) => setCarForm({ ...carForm, [e.target.name]: e.target.value });

  const addOrUpdateCar = async (e) => {
    e.preventDefault();
    try {
      if (cars.find(x => x.carId === Number(carForm.carId))) {
        await updateCar(carForm);
        setMsg({ type: "success", text: "Car updated" });
      } else {
        await addCar(carForm);
        setMsg({ type: "success", text: "Car added" });
      }
      loadAll();
    } catch (err) {
      setMsg({ type: "danger", text: err?.response?.data || "Failed" });
    }
  };

  const removeCar = async (id) => {
    if (!window.confirm("Delete this car?")) return;
    try { await deleteCar(id); setMsg({ type: "success", text: "Deleted" }); loadAll(); }
    catch (err) { setMsg({ type: "danger", text: err?.response?.data || "Failed" }); }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Admin Dashboard</h2>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Manage Cars</h5>
          <form className="row g-2" onSubmit={addOrUpdateCar}>
            <div className="col-md-2"><input className="form-control" name="carId" value={carForm.carId} onChange={onCarChange} type="number" min={5} max={99} required /></div>
            <div className="col-md-2"><input className="form-control" name="brand" value={carForm.brand} onChange={onCarChange} placeholder="Brand (Capitalize)" required /></div>
            <div className="col-md-2"><input className="form-control" name="model" value={carForm.model} onChange={onCarChange} placeholder="Model (Capitalize)" required /></div>
            <div className="col-md-2"><input className="form-control" name="pricePerDay" value={carForm.pricePerDay} onChange={onCarChange} type="number" min={800} required /></div>
            <div className="col-md-2">
              <select className="form-select" name="availability" value={carForm.availability} onChange={onCarChange}>
                <option>AVAILABLE</option>
                <option>BOOKED</option>
              </select>
            </div>
            <div className="col-md-2"><button className="btn btn-primary w-100">Save</button></div>
          </form>

          <div className="table-responsive mt-3">
            <table className="table table-sm table-striped align-middle">
              <thead><tr><th>ID</th><th>Brand</th><th>Model</th><th>₹/day</th><th>Avail</th><th></th></tr></thead>
              <tbody>
                {cars.map(c => (
                  <tr key={c.carId}>
                    <td>{c.carId}</td><td>{c.brand}</td><td>{c.model}</td><td>{c.pricePerDay}</td><td>{c.availability}</td>
                    <td><button className="btn btn-sm btn-outline-danger" onClick={()=>removeCar(c.carId)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-6">
          <div className="card h-100"><div className="card-body">
            <h5 className="card-title">Users</h5>
            <div className="table-responsive" style={{maxHeight: 260}}>
              <table className="table table-sm table-striped"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr></thead>
                <tbody>
                  {users.map(u => (<tr key={u.userId}><td>{u.userId}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>))}
                </tbody>
              </table>
            </div>
          </div></div>
        </div>
        <div className="col-lg-6">
          <div className="card h-100"><div className="card-body">
            <h5 className="card-title">Reservations</h5>
            <div className="d-flex gap-2 mb-2">
              <button className="btn btn-sm btn-outline-secondary" onClick={async()=>setReservations(await getAllReservations())}>All</button>
              <button className="btn btn-sm btn-outline-secondary" onClick={async()=>setReservations(await getByReservationGreaterThan(2000))}>Total > 2000</button>
            </div>
            <div className="table-responsive" style={{maxHeight: 260}}>
              <table className="table table-sm table-striped"><thead><tr><th>ID</th><th>User</th><th>Car</th><th>Pickup</th><th>Dropoff</th><th>Total</th><th>Status</th></tr></thead>
                <tbody>
                  {reservations.map(r => (
                    <tr key={r.reservationId}>
                      <td>{r.reservationId}</td><td>{r.userId}</td><td>{r.carId}</td><td>{r.pickupDate}</td><td>{r.dropoffDate}</td><td>{r.totalAmount}</td><td>{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div></div>
        </div>
        <div className="col-12">
          <div className="card h-100"><div className="card-body">
            <h5 className="card-title">Payments</h5>
            <div className="d-flex gap-2 mb-2">
              <button className="btn btn-sm btn-outline-secondary" onClick={async()=>setPayments(await getAllPayments())}>All</button>
              <button className="btn btn-sm btn-outline-secondary" onClick={async()=>setPayments(await getByMethodAndStatus('CARD','SUCCESS'))}>CARD & SUCCESS</button>
            </div>
            <div className="table-responsive">
              <table className="table table-sm table-striped"><thead><tr><th>ID</th><th>Res</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
                <tbody>
                  {payments.map(p => (<tr key={p.paymentId}><td>{p.paymentId}</td><td>{p.reservationId}</td><td>{p.amount}</td><td>{p.method}</td><td>{p.status}</td></tr>))}
                </tbody>
              </table>
            </div>
          </div></div>
        </div>
      </div>
    </div>
  );
}
*/