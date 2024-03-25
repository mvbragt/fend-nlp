const FormData = require('form-data');
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js');

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1';
const apiKey = process.env.API_KEY;

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
});

let inputData = [];

function pushData(meaningCloudData, res) {
    inputData.push(meaningCloudData);
    res.send(inputData[inputData.length - 1]);
}

app.post('/article-api', async (req, res) => {
    const fetch = (await import('node-fetch')).default;
    const articleUrl = req.body.url;
    console.log(`The data that you entered: ${articleUrl}`);
    const apiURL = `${baseUrl}?key=${apiKey}&lang=en&url=${encodeURIComponent(articleUrl)}`;

    const form = new FormData();
    form.append('key', apiKey);
    form.append('lang', 'en');
    form.append('model', 'general');
    form.append('url', articleUrl);

    try {
        const apiResponse = await fetch(apiURL, { // Fixed: Use apiURL instead of baseUrl
            method: 'POST',
            body: form,
            headers: form.getHeaders(),
        });

        if (!apiResponse.ok) {
            throw new Error(`HTTP error! status: ${apiResponse.status}`);
        }

        const meaningCloudData = await apiResponse.json(); // Fixed: Correct variable name
        pushData(meaningCloudData, res);
        res.json(meaningCloudData); // Simplified: Directly send JSON response
    } catch (error) {
        console.error('Error making API request:', error);
        res.status(500).send('Server error occurred');
    }
});
