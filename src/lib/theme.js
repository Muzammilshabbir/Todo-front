// lib/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Default blue
    },
    secondary: {
      main: '#dc004e', // Default pink
    },
    background: {
      default: '#f4f4f4', // Light background
    },
  },
});

export default theme;
