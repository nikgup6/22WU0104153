import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import Log from '../Logger.mjs';

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

function Shortener() {
  const [urlsToShorten, setUrlsToShorten] = useState([{ originalUrl: '', customShortcode: '', validity: '' }]);
  const [shortenedLinks, setShortenedLinks] = useState(() => {
    const savedLinks = localStorage.getItem('shortenedLinks');
    return savedLinks ? JSON.parse(savedLinks) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const backendUrl = 'http://localhost:3001';

  useEffect(() => {
    localStorage.setItem('shortenedLinks', JSON.stringify(shortenedLinks));
  }, [shortenedLinks]);
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newUrls = [...urlsToShorten];
    newUrls[index] = { ...newUrls[index], [name]: value };
    setUrlsToShorten(newUrls);
  };

  const handleAddUrlField = () => {
    if (urlsToShorten.length < 5) {
      setUrlsToShorten([...urlsToShorten, { originalUrl: '', customShortcode: '', validity: '' }]);
    }
  };

  const handleShortenUrls = async () => {
    setLoading(true);
    setError('');
    const newShortenedLinks = [];

    for (const urlData of urlsToShorten) {
      if (urlData.originalUrl) {
        if (!urlRegex.test(urlData.originalUrl)) {
          setError(`Invalid URL format for: ${urlData.originalUrl}`);
          Log('frontend', 'error', 'component', 'Invalid URL format provided.');
          setLoading(false);
          return;
        }

        try {
          const response = await axios.post(`${backendUrl}/shorturls`, {
            url: urlData.originalUrl,
            validity: urlData.validity ? parseInt(urlData.validity) : undefined,
            shortcode: urlData.customShortcode || undefined,
          });
          newShortenedLinks.push(response.data);
          Log('frontend', 'info', 'component', 'URL shortened successfully.');
        } catch (err) {
          const errorMessage = err.response?.data?.error || err.message;
          setError(`Error shortening URL: ${errorMessage}`);
          Log('frontend', 'error', 'component', `API error: ${errorMessage}`);
          setLoading(false);
          return;
        }
      }
    }

    setShortenedLinks(newShortenedLinks);
    setUrlsToShorten([{ originalUrl: '', customShortcode: '', validity: '' }]);
    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Shorten Your URL
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Transform long URLs into short, manageable links.
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {urlsToShorten.map((input, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
            <TextField
              fullWidth
              label="Original URL"
              name="originalUrl"
              value={input.originalUrl}
              onChange={(e) => handleInputChange(index, e)}
              variant="outlined"
            />
            <TextField
              label="Custom Short Code (Optional)"
              name="customShortcode"
              value={input.customShortcode}
              onChange={(e) => handleInputChange(index, e)}
              variant="outlined"
              sx={{ width: '30%' }}
            />
            <TextField
              label="Validity (Minutes)"
              name="validity"
              type="number"
              value={input.validity}
              onChange={(e) => handleInputChange(index, e)}
              variant="outlined"
              sx={{ width: '20%' }}
            />
            {urlsToShorten.length > 1 && (
              <Button onClick={() => {
                const newUrls = [...urlsToShorten];
                newUrls.splice(index, 1);
                setUrlsToShorten(newUrls);
              }} color="secondary" size="small">Remove</Button>
            )}
          </Box>
        ))}
        {urlsToShorten.length < 5 && (
          <Button onClick={handleAddUrlField} sx={{ mb: 2 }}>Add Another URL</Button>
        )}
        <Button variant="contained" color="primary" onClick={handleShortenUrls} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Shorten URL'}
        </Button>

        {shortenedLinks.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Shortened Links
            </Typography>
            {shortenedLinks.map((link, index) => (
              <Typography key={index} variant="body1">
                Link: <a href={link.shortlink} target="_blank" rel="noopener noreferrer">{link.shortlink}</a> (Expires: {new Date(link.expiry).toLocaleString()})
              </Typography>
            ))}
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default Shortener;