import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000"; // when deployed, replace with Render backend URL

function App() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/rooms`)
      .then(res => res.json())
      .then(setRooms);
  }, []);

  const book = async (id) => {
    await fetch(`${API_URL}/api/book/${id}`, { method: "POST" });
    alert("Booked!");
    setRooms(rooms.map(r => r.id === id ? { ...r, available: false } : r));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🏨 Hotel Management (Demo)</h1>
      {rooms.map(r => (
        <div key={r.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>Room {r.number} — {r.type}</h3>
          <p>Price: ₹{r.price}</p>
          <button disabled={!r.available} onClick={() => book(r.id)}>
            {r.available ? "Book Now" : "Unavailable"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
