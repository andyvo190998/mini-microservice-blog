const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res) => {
    const event = req.body;
    console.log('received a request');
    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:4001/events', event);
    await axios.post('http://localhost:4002/events', event);
    await axios.post('http://localhost:4003/events', event);

    res.send({ status: 'OK' });
});

app.listen(4005, () => console.log('Event Broker is listening on 4005'));