import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { AuthContext } from '../context/AuthContext';

const getSaleOrdersFromLocalStorage = () => {
  const data = localStorage.getItem('saleOrders');
  return data ? JSON.parse(data) : [];
};

const saveSaleOrdersToLocalStorage = (orders) => {
  localStorage.setItem('saleOrders', JSON.stringify(orders));
};

const CompletedSaleOrders = () => {
  
  const [orders, setOrders] = useState([]);
  const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
      navigate('/');
  };

  useEffect(() => {
    const fetchedOrders = getSaleOrdersFromLocalStorage();
    const completedOrders = fetchedOrders.filter(order => order.status === 'completed');
    setOrders(completedOrders);
  }, []);

  const handleActivesales = () => {
    navigate("/active-sale-orders");
  };

  const handleCompletedsales = () => {
    navigate("/completed-sale-orders");
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    saveSaleOrdersToLocalStorage(updatedOrders);
  };

  return (
    <div className="container" >
      <div className='flex'>
        <div>
          <button className="sales-btn" onClick={handleActivesales}>Active Sale Orders</button>
          <button className="sales-btn" onClick={handleCompletedsales}>Completed Sale Orders</button>
        </div>
        <div>
          <ThemeToggle />
          <button onClick={handleLogout} className="sales-btn" style={{margin:"0 10px"}}>Logout</button>
        </div>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Product Names</th>
            <th>Total Price (₹)</th>
            <th>Status</th>
            <th>Last Modified</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer_name}</td>
              <td>{order.items.map(item => item.product_name).join(', ')}</td>
              <td>{order.items.reduce((total, item) => total + item.price, 0).toFixed(2)}</td>
              <td>{order.paid ? 'Paid' : 'Unpaid'}</td>
              <td>{order.lastModified}</td>
              <td><button className="delete-btn" onClick={() => handleDeleteOrder(order.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedSaleOrders;
