const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Use CORS to allow requests from your frontend
app.use(cors({ origin: '*' }));

// API route to fetch weather data
app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  const API_KEY = 'e099292a27979e477608d04f7c11f658';

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    res.json(response.data); // Send the data back to the client (frontend)
  } catch (error) {
    res.status(500).send('Error fetching weather data');
  }
});

// Set up the server to listen on port 3001
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
