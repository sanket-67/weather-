const express = require('express');
const axios = require('axios');
const bodyparser = require('body-parser');
const app = express();
const PORT = 5000;

// Set up the view engine
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded bodies
app.use(bodyparser.urlencoded({ extended: true }));

const apiKey = '6cacc4db1d1d67d69c28125e81e3f5b2';

// Function to get weather forecast data
async function getForecast(location) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
            q: location,
            appid: apiKey,
            units: 'metric'
        }
    });
    return response.data;
}

// Serve the main page
app.get('/', (req, res) => {
    res.render('index'); // Ensure 'index.ejs' exists in the 'views' folder
});

// Handle search requests
app.post('/search', async (req, res) => {
    const location = req.body.query;

    try {
        // Get weather forecast data
        const forecastData = await getForecast(location);

        // Render the index page with weather data
        res.render('index', { forecastData });
    } catch (error) {
        console.error(error);
        res.render('index', { forecastData: null }); // Handle the case where data isn't fetched
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
