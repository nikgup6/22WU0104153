import React, { useState, useEffect } from 'react';
import {
  Typography, Container, Paper, TextField, Button, Box,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, CircularProgress
} from '@mui/material';
import axios from 'axios';
import Log from '../Logger.mjs';

function Statistics() {
  const [shortcode, setShortcode] = useState('');
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem('lastFetchedStats');
    return savedStats ? JSON.parse(savedStats) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const backendUrl = 'http://localhost:3001';
  useEffect(() => {
    if (stats) {
      localStorage.setItem('lastFetchedStats', JSON.stringify(stats));
    } else {
      localStorage.removeItem('lastFetchedStats');
    }
  }, [stats]);

  const handleFetchStats = async () => {
    if (!shortcode) {
      setError('Please enter a shortcode.');
      return;
    }

    setLoading(true);
    setError('');
    setStats(null); 

    try {
      const response = await axios.get(`${backendUrl}/shorturls/${shortcode}`);
      setStats(response.data);
      Log('frontend', 'info', 'component', `Fetched stats for shortcode: ${shortcode}`);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(`Error fetching stats: ${errorMessage}`);
      Log('frontend', 'error', 'component', `API error fetching stats: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          URL Analytics
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Get detailed statistics for your shortened links.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <TextField
            fullWidth
            label="Enter Shortcode"
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value)}
            variant="outlined"
          />
          <Button variant="contained" onClick={handleFetchStats} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Fetch Stats'}
          </Button>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        {stats && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Statistics for: {stats.shortlink}</Typography>
            <Typography variant="body1">Original URL: {stats.originalUrl}</Typography>
            <Typography variant="body1">Total Clicks: {stats.totalClicks}</Typography>
            <Typography variant="body1">Creation Date: {new Date(stats.creationDate).toLocaleString()}</Typography>
            <Typography variant="body1">Expiry Date: {new Date(stats.expiryDate).toLocaleString()}</Typography>
            
            {stats.clickDetails.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>Click Details</Typography>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Source</TableCell>
                        <TableCell>Location</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stats.clickDetails.map((click, index) => (
                        <TableRow key={index}>
                          <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
                          <TableCell>{click.source}</TableCell>
                          <TableCell>{click.location}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default Statistics;