const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const CORS = require('cors');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use(CORS());
const commentsByPostId = {};

app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
});
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});


app.post('/posts/:id/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: id, content: content });

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: id,
            content,
            postId: req.params.id
        }
    });

    res.status(200).send(comments);
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.send({});
});


app.listen(4001, () => console.log('comments service is listening on 4001'));