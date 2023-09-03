import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
 
  palette: {
    mode: 'dark',
    primary: {
      main: '#e3f2fd', // Primary color for elements like buttons, etc.
    },
    
  },
  typography: {
    fontFamily: 'Segoe UI, Arial, sans-serif', // Specify the desired font family
  },
  
});



export default theme;
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
 
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </ThemeProvider>,
)
