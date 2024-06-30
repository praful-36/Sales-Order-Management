import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './components/Login';
import ActiveSaleOrders from './components/ActiveSaleOrders';
import CompletedSaleOrders from './components/CompletedSaleOrders';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import "./App.css"
import Navbar from './components/Navbar';
import About from './components/About';

const App = () => {
  return (
    <ChakraProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router basename="/Sales-Order-Management">
         <Navbar/>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/active-sale-orders" element={<ProtectedRoute component={ActiveSaleOrders} />} />
              <Route path="/completed-sale-orders" element={<ProtectedRoute component={CompletedSaleOrders} />} />
              <Route path="/about" element={<About />}  />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
};

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default App;
