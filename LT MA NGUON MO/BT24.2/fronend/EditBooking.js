import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditBooking = ({ booking, onBookingUpdated, onCancel }) => {
    const [customerName, setCustomerName] = useState(booking.customerName);
    const [date, setDate] = useState(booking.date);
    const [time, setTime] = useState(booking.time);
    const [error, setError] = useState(null);

    useEffect(() => {
        setCustomerName(booking.customerName);
        setDate(booking.date);
        setTime(booking.time);
    }, [booking]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            const response = await axios.put(`http://localhost:5000/api/bookings/${booking._id}`, {
                customerName,
                date,
                time,
            });
            onBookingUpdated(response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Chỉnh Sửa Đặt Chỗ</h2>
            {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    type="text"
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
                <div className="flex space-x-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Cập Nhật</button>
                    <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded w-full">Hủy</button>
                </div>
            </form>
        </div>
    );
};

export default EditBooking;
