// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Route for news (headlines or search)
app.get('/api/news', async (req, res) => {
  try {
    const { category = '', page = 1, pageSize = 5, q = '' } = req.query;

    const endpoint = q ? 'everything' : 'top-headlines';

    const params = {
      apiKey: process.env.NEWS_API_KEY,
      page,
      pageSize,
    };

    if (q) {
      params.q = q;
    } else {
      params.country = 'us';
      if (category) params.category = category;
    }

    const response = await axios.get(`https://newsapi.org/v2/${endpoint}`, {
      params,
    });

    res.json(response.data);
  } catch (error) {
    console.error('🛑 Error fetching news:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
