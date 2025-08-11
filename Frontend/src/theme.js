// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2C3E50', // A dark, professional blue
    },
    secondary: {
      main: '#3498DB', // A bright, inviting blue
    },
    background: {
      default: '#F5F5F5', // A light gray background
      paper: '#FFFFFF', // White for cards and papers
    },
    text: {
      primary: '#2C3E50',
      secondary: '#7F8C8D',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h5: {
      fontWeight: 600,
      color: '#2C3E50',
    },
    h6: {
      fontWeight: 500,
      color: '#34495E',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;