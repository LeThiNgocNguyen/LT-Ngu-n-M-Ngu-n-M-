import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = ({ onEdit }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/bookings');
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleCancel = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/bookings/${id}`);
            fetchBookings();
        } catch (error) {
            console.error('Error cancelling booking:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Danh Sách Đặt Chỗ</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Tên Khách Hàng</th>
                        <th className="border p-2">Ngày</th>
                        <th className="border p-2">Giờ</th>
                        <th className="border p-2">Trạng Thái</th>
                        <th className="border p-2">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id} className="text-center">
                            <td className="border p-2">{booking._id}</td>
                            <td className="border p-2">{booking.customerName}</td>
                            <td className="border p-2">{booking.date}</td>
                            <td className="border p-2">{booking.time}</td>
                            <td className={`border p-2 ${
                                booking.status === 'Pending' ? 'text-yellow-500' :
                                booking.status === 'Confirmed' ? 'text-green-500' : 'text-red-500'
                            }`}>{booking.status}</td>
                            <td className="border p-2">
                                <button onClick={() => onEdit(booking)} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">Sửa</button>
                                <button onClick={() => handleCancel(booking._id)} className="bg-red-500 text-white px-2 py-1 rounded">Hủy</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingList;
