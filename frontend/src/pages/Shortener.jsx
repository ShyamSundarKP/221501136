import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

const Shortener = () => {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [expiry, setExpiry] = useState(5);
  const [result, setResult] = useState([]);

  const generateShortcode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    const allData = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    const existing = allData.find((item) => item.short === customCode);

    if (customCode && existing) {
      alert('This custom code is already taken. Please choose another one.');
      return;
    }

    const shortcode = customCode || generateShortcode();

    const newResult = {
      original: url,
      short: shortcode,
      expiry,
      createdAt: Date.now(),
    };

    const updatedResults = [...result, newResult];
    setResult(updatedResults);

      console.log(`[Logger] Shortened URL created: ${shortcode}`);
  console.log(`[Validator] Input URL validated: ${url}`);
  console.log(`[Expiry] Set to expire in ${expiry} minutes`);
  if (customCode) console.log(`[Custom] Custom shortcode used: ${customCode}`);

  // Save to localStorage
  localStorage.setItem('shortenedUrls', JSON.stringify(updatedResults));

  // Reset input fields
  setUrl('');
  setCustomCode('');

    

    // Persist updated result
    localStorage.setItem('shortenedUrls', JSON.stringify(updatedResults));

    // Logging middleware simulation
    console.log(`[Logger] Shortened URL created: ${shortcode}`);
console.log(`[Validator] Input URL validated: ${url}`);
console.log(`[Expiry] Set to expire in ${expiry} minutes`);

    if (customCode) console.log(`[Custom] Custom shortcode used: ${customCode}`);

    // Reset fields
    setUrl('');
    setCustomCode('');
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter URL"
          variant="outlined"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Custom Shortcode (optional)"
          variant="outlined"
          fullWidth
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Expiry Time (mins)</InputLabel>
          <Select value={expiry} onChange={(e) => setExpiry(e.target.value)} label="Expiry Time">
            <MenuItem value={5}>5 Minutes</MenuItem>
            <MenuItem value={10}>10 Minutes</MenuItem>
            <MenuItem value={30}>30 Minutes</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" type="submit">
          Generate Short URL
        </Button>
      </form>

      {result.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Shortened URLs:
          </Typography>
          {result.map((r, i) => (
            <Box
              key={i}
              mt={2}
              p={2}
              border="1px solid #ccc"
              borderRadius="8px"
              bgcolor="#f5f5f5"
            >
              <Typography><strong>Original URL:</strong> {r.original}</Typography>
              <Typography>
                <strong>Shortened URL:</strong>{' '}
                <a
                  href={`/${r.short}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1976d2', textDecoration: 'none' }}
                >
                  http://localhost:3000/{r.short}
                </a>
              </Typography>
              <Typography><strong>Expires in:</strong> {r.expiry} minutes</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Shortener;
