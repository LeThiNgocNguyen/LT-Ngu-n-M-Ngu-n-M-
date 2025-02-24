import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingList from './BookingList';
import BookingForm from './BookingForm';
import EditBooking from './EditBooking';

const App = () => {
    const [bookings, setBookings] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/bookings');
            setBookings(response.data);
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
        }
    };

    const handleBookingAdded = (newBooking) => {
        setBookings([...bookings, newBooking]);
    };

    const handleBookingUpdated = (updatedBooking) => {
        setBookings(bookings.map(b => b._id === updatedBooking._id ? updatedBooking : b));
        setEditingBooking(null);
    };

    const handleEditBooking = (booking) => {
        setEditingBooking(booking);
    };

    const handleCancelEdit = () => {
        setEditingBooking(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Quản Lý Lịch Đặt Chỗ</h1>
            {editingBooking ? (
                <EditBooking 
                    booking={editingBooking} 
                    onBookingUpdated={handleBookingUpdated} 
                    onCancel={handleCancelEdit} 
                />
            ) : (
                <>
                    <BookingForm onBookingAdded={handleBookingAdded} />
                    <BookingList bookings={bookings} onEdit={handleEditBooking} fetchBookings={fetchBookings} />
                </>
            )}
        </div>
    );
};

export default App;
