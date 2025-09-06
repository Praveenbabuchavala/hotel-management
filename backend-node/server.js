const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let rooms = [
  { id: 1, number: "101", type: "Deluxe", price: 2500, available: true },
  { id: 2, number: "102", type: "Standard", price: 1500, available: false },
  { id: 3, number: "103", type: "Suite", price: 4000, available: true }
];

app.get('/api/rooms', (req, res) => {
  res.json(rooms);
});

app.post('/api/book/:id', (req, res) => {
  const id = parseInt(req.params.id);
  rooms = rooms.map(r => r.id === id ? { ...r, available: false } : r);
  res.json({ message: 'Room booked!', id });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
