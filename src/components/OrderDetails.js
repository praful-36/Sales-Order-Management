// OrderDetails.js
import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const OrderDetails = ({ selectedOrder, allOrders, onBack, handleLogout }) => {
    const navigate = useNavigate();

    if (!selectedOrder) return null;

    const handleCompletedsales = () => {
        navigate("/completed-sale-orders");
    };

    const renderOrderDetails = (order) => {
        const totalPrice = order.items.reduce((total, item) => total + item.price, 0).toFixed(2);
        const productNames = order.items.map(item => item.product_name).join(', ');

        return (
            <div className="order-info order-details" key={order.id}>
                <div className="order-info-row">
                    <p><strong>ID:</strong> {order.id}</p>
                </div>
                <div className="order-info-row">
                    <p><strong>Customer Name:</strong> {order.customer_name}</p>
                </div>
                <div className="order-info-row">
                    <p><strong>Product Names:</strong> {productNames}</p>
                </div>
                <div className="order-info-row">
                    <p><strong>Total Price:</strong> {totalPrice} $</p>
                </div>
                <div className="order-info-row">
                    <p><strong>Last Modified:</strong> {order.lastModified}</p>
                </div>
                <div className="order-info-row">
                    <p><strong>Status:</strong> {order.status}</p>
                </div>
                <div className="order-info-row">
                    <p><strong>Paid:</strong> {order.paid ? 'Paid' : 'Unpaid'}</p>
                </div>
                <div className="order-info-row">
                    <p><strong>Notes:</strong> {order.notes}</p>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="order-detail">
                <div className='flex'>
                    <div>
                        <button className="back-btn" onClick={onBack}>Active Sale Orders</button>
                        <button className="sales-btn" onClick={handleCompletedsales}>Completed Sale Orders</button>
                    </div>
                    <div>
                        <ThemeToggle />
                        <button onClick={handleLogout} className="sales-btn" style={{ margin: "0 10px" }}>Logout</button>
                    </div>
                </div>

                <div>
                    <h3 style={{ margin: "20px 0", fontSize: "20px" }}>Order Details:-</h3>
                    {renderOrderDetails(selectedOrder)}
                </div>
                <div>
                    <h3 style={{ margin: "20px 0", fontSize: "20px" }}>All Orders:-</h3>
                    {allOrders.map(order => renderOrderDetails(order))}
                </div>
            </div>
        </>
    );
};

export default OrderDetails;
