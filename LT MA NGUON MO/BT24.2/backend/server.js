// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/bookingDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/bookings', bookingRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// backend/models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' }
});

module.exports = mongoose.model('Booking', BookingSchema);

// backend/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get all bookings
router.get('/', async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
});

// Create a new booking
router.post('/', async (req, res) => {
    const { customerName, date, time } = req.body;
    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking) return res.status(400).json({ message: 'Time slot already booked' });
    
    const newBooking = new Booking({ customerName, date, time, status: 'Pending' });
    await newBooking.save();
    res.json(newBooking);
});

// Update a booking
router.put('/:id', async (req, res) => {
    const { customerName, date, time } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { customerName, date, time }, { new: true });
    res.json(updatedBooking);
});

// Cancel a booking
router.delete('/:id', async (req, res) => {
    await Booking.findByIdAndUpdate(req.params.id, { status: 'Cancelled' });
    res.json({ message: 'Booking cancelled' });
});

module.exports = router;
