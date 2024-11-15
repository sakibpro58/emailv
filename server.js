const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const apiToken = process.env.API_TOKEN; // Set API token in environment
const apiUrl = 'https://happy.mailtester.ninja';

app.get('/verify', async (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).send('Email query parameter is required');
    }
    
    try {
        const response = await axios.get(apiUrl, {
            params: { email: email, key: apiToken }
        });
        res.json(response.data);
    } catch (error) {
        res.json({ email: email, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
