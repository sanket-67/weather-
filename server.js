const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // assuming you're using axios to fetch data
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Handle GET request to render initial page
app.get('/', (req, res) => {
    res.render('index', { forecastData: null }); // Pass null initially
});

// Handle POST request from the search form
app.post('/search', async (req, res) => {
    const location = req.body.query;

    try {
        // Example: Fetch weather data using OpenWeather API
        const apiKey = '6cacc4db1d1d67d69c28125e81e3f5b2';  // Replace with your OpenWeather API key
        const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;

        const response = await axios.get(apiUrl);

        const forecastData = response.data;

        // Render the view with forecastData
        res.render('index', { forecastData });
    } catch (error) {
        console.error(error);
        res.render('index', { forecastData: null, error: 'City not found or unable to fetch weather data.' });
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
