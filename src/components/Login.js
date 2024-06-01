import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
    if (login(username.value, password.value)) {
      navigate('/active-sale-orders');
    }
  };

  return (
    <Box as="form" onSubmit={handleLogin} p={4} borderWidth={1} borderRadius="lg" style={{borderColor:"#b5bbc2",width:"50%",margin: "14rem auto"}}>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input name="username" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input type="password" name="password" />
      </FormControl>
      <Button type="submit" colorScheme="teal" mt={4}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
