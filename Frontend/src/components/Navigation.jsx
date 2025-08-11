// src/components/Navigation.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" color="white" sx={{ flexGrow: 1 }}>
          URLShortener
        </Typography>
        <Tabs
          value={location.pathname}
          textColor="inherit" // Sets the text color to white (which is inherited from the dark AppBar)
          indicatorColor="secondary" // Uses the bright secondary color for the indicator
          aria-label="navigation tabs"
        >
          <Tab label="URL Shortener" value="/" component={Link} to="/" />
          <Tab label="Analytics" value="/analytics" component={Link} to="/analytics" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;