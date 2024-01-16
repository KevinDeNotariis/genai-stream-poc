const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

API_URI = process.env.API_URI;

const app = express();
const api = axios.create({
    baseURL: API_URI,
});
app.use(cors());

app.get('/', async (req, res) => {
    const response = await api.get('/', {
        responseType: 'stream',
    });

    const stream = response.data;

    stream.pipe(res);
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});
