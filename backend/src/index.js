const express = require('express');
const cors = require('cors');
const path = require('path');
const countriesService = require('./services/countries/countryService');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/countries', async (req, res) => {
  try {
    const countries = await countriesService.getCountries();
    res.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

// Fallback route for any other requests
app.use((req, res) => {
  res.status(404).send('API endpoint not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
