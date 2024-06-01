import React from 'react';
import { Switch } from '@chakra-ui/react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <Switch
      isChecked={theme === 'dark'}
      onChange={toggleTheme}
      colorScheme="teal"
      size="lg"
      aria-label="Toggle Dark Mode"
      sx={{
        '.chakra-switch__track': {
          bg: theme === 'light'? 'rgb(60, 60, 60)' : undefined,
        },
      }}
    />
  );
};

export default ThemeToggle;
