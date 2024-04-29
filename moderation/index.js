const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const CORS = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(CORS());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log('moderation receives a request');
    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status: status,
                content: data.content
            }
        });
    }

    res.send({});
});


app.listen(4003, () => console.log("Moderation service is running on 4003"));