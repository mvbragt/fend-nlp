const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.API_KEY;

const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

let projectInput = [];

// Parse incoming request bodies in a middleware before your handlers, through req.body property.
app.use(bodyParser.json());

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});


const index = app.listen( 8081, function () {
    const port = index.address().port;
    console.log("App now running on port", port);
});

// test api
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});



// POST method
app.post('/articleApi', async (req, res) => {
    projectInput = req.body.url;
    const apiURL = `${baseURL}?key=${apiKey}&txt=${projectInput}&lang=en`
    const response = await fetch(apiURL);
    console.log('response url:', response);
    try {
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log("error", error);
    }
});


