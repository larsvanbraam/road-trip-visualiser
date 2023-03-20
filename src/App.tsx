import React from 'react';
import { ThemeProvider } from '@mui/material';
import './App.css';
import { theme } from './theme';

import { RouterProvider } from 'react-router-dom';
import { router } from './config/router';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
