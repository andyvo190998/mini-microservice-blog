const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post('/events', async (req, res) => {
    const event = req.body;
    events.push(event);
    console.log('received a request');
    await axios.post('http://posts-clusterip-srv:4000/events', event);
    // await axios.post('http://localhost:4001/events', event);
    // try {
    //     await axios.post('http://localhost:4002/events', event);
    // } catch (error) {
    //     console.log(error);
    // }
    // await axios.post('http://localhost:4003/events', event);

    res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
});

app.listen(4005, () => console.log('Event Broker is listening on 4005, v1'));