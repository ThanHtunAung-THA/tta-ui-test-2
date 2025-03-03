import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3001;

app.use(cors());

const API_KEY = '2';
const BASE_URL = 'https://www.theaudiodb.com/api/v1/json';
// const BASE_URL_2 = 'https://www.theaudiodb.com/api/v1/json/{API_KEY}/artist.php?i=112024';

// Proxy endpoint
app.get('/api/*', async (req, res) => {
    try {
        const endpoint = req.params[0];
        const queryString = new URLSearchParams(req.query).toString();
        const url = `${BASE_URL}/${API_KEY}/${endpoint}${
            queryString ? '?' + queryString : ''
        }`;

        console.log(queryString);

        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
