const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const CORS = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(CORS());
const posts = {};

app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
});
app.get('/posts', (req, res) => {
    res.send(posts);
});


app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id, title
    };
    try {
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'PostCreated',
            data: {
                id, title
            }
        });
        res.status(201).send(posts[id]);
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: 'request error' });
    }
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.send({});
});


app.listen(4000, () => {
    console.log('version v2.2');
    console.log('posts service is listening on 4000');
});