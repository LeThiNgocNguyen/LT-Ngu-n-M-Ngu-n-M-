import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ onBookingAdded }) => {
    const [customerName, setCustomerName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/bookings', {
                customerName,
                date,
                time,
            });
            onBookingAdded(response.data);
            setCustomerName('');
            setDate('');
            setTime('');
        } catch (error) {
            setError(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Đặt Chỗ Mới</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    type="text"
                    placeholder="Tên Khách Hàng"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">Đặt Chỗ</button>
            </form>
        </div>
    );
};

export default BookingForm;
