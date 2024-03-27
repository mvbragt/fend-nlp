const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.API_KEY;

const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');


const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));


// Middleware
// Parse incoming request bodies in a middleware before your handlers, through req.body property.
app.use(bodyParser.text());

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
const port = 8080;


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});


const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
});




// test api
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});

// POST method
app.post('/articleApi', async (req, res) => {
    const response = await fetch(`${baseURL}?key=${API_KEY}&lang=auto&url=${req.body}`);
    console.log('response url:', response);
    try {
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log("error", error);
    }
});

