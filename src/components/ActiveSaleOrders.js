import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import SaleOrderFormWrapper from './SaleOrderForm';
import OrderDetails from './OrderDetails';
import "../App.css"
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { fetchCustomers, fetchProducts } from '../api/index';
import { AuthContext } from '../context/AuthContext';

const getSaleOrdersFromLocalStorage = () => {
  const data = localStorage.getItem('saleOrders');
  return data ? JSON.parse(data) : [];
};

const saveSaleOrdersToLocalStorage = (orders) => {
  localStorage.setItem('saleOrders', JSON.stringify(orders));
};

const ActiveSaleOrders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(getSaleOrdersFromLocalStorage());
  const [prefetchedCustomers, setPrefetchedCustomers] = useState([]);
  const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setOrders(getSaleOrdersFromLocalStorage());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const customers = await fetchCustomers();
      const products = await fetchProducts();
      const prefetchedCustomersData = customers.slice(0, 2).map(customer => {
        const productNames = products.map(product => product.name);
        return { ...customer, products: productNames };
      });
      setPrefetchedCustomers(prefetchedCustomersData);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

  const handleSubmit = (data) => {
    const updatedOrders = selectedOrder
      ? orders.map((order) => (order.id === selectedOrder.id ? { ...order, ...data, status: 'active' } : order))
      : [...orders, { ...data, id: orders.length + 1, status: 'active' }];

    setOrders(updatedOrders);
    saveSaleOrdersToLocalStorage(updatedOrders);
    onClose();
    setSelectedOrder(null);
  };

  const handleDeletePrefetchedCustomer = (customerId) => {
    const updatedPrefetchedCustomers = prefetchedCustomers.filter(customer => customer.id !== customerId);
    setPrefetchedCustomers(updatedPrefetchedCustomers);
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    saveSaleOrdersToLocalStorage(updatedOrders);
  };

  const handleMarkAsCompleted = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: 'completed' } : order
    );
    setOrders(updatedOrders);
    saveSaleOrdersToLocalStorage(updatedOrders);
  };

  const handleActivesales = () => {
    navigate("/active-sale-orders");
  };

  const handleCompletedsales = () => {
    navigate("/completed-sale-orders");
  };

  return (
    <div style={{ margin: "45px", padding: "10px", boxShadow: "0 19px 38px rgba(0, 0, 0, 0.30),8px 9px 12px rgba(0, 0, 0, 0.22)", borderRadius: "20px" }}>
      {selectedOrder ? (
        <OrderDetails selectedOrder={selectedOrder} notes={selectedOrder?.notes} allOrders={orders} onBack={handleBackToOrders} handleLogout={handleLogout} />
      ) : (
        <>
          <div className='flex'>
            <div>
              <button className="sales-btn" onClick={handleActivesales}>Active Sale Orders</button>
              <button className="sales-btn" onClick={handleCompletedsales}>Completed Sale Orders</button>
            </div>
            <div>
              <button className="sales-btn" style={{ margin: "0 20px" }} onClick={() => { setSelectedOrder(null); onOpen(); }}>+ Sale Order</button>
              <ThemeToggle />
              <button onClick={handleLogout} className="sales-btn" style={{ margin: "0 10px" }}>Logout</button>
            </div>
          </div>
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Product Names</th>
                <th>Total Price (₹)</th>
                <th>Last Modified</th>
                <th>Status</th>
                <th>View</th>
                <th>Complete</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {prefetchedCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>-</td>
                  <td>{customer.name}</td>
                  <td>{customer.products.join(', ')}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeletePrefetchedCustomer(customer.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {orders.filter(order => order.status === 'active').map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.items.map(item => item.product_name).join(', ')}</td>
                  <td>{order.items.reduce((total, item) => total + item.price, 0).toFixed(2)} $</td>
                  <td>{order.lastModified}</td>
                  <td>{order.paid ? 'Paid' : 'Unpaid'}</td>
                  <td><button className="view-btn" onClick={() => handleViewOrder(order)}>View</button></td>
                  <td><button className="complete-btn" onClick={() => handleMarkAsCompleted(order.id)}>Mark as Completed</button></td>
                  <td><button className="delete-btn" onClick={() => handleDeleteOrder(order.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal isOpen={isOpen} onClose={() => { onClose(); setSelectedOrder(null); }}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Sale Order Form</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <SaleOrderFormWrapper
                  onClose={() => { onClose(); setSelectedOrder(null); }}
                  onSubmit={handleSubmit}
                  defaultValues={selectedOrder}
                  readOnly={false}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ActiveSaleOrders;
