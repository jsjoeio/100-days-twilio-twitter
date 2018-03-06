const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const TwitterPackage = require('twitter');

const secret = {
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
}

const app = express();
const Twitter = new TwitterPackage(secret);

app.use(bodyParser());

app.post('/sms', (req, res) => {
    let message = req.body.Body;
    Twitter.post('statuses/update', { "status": message }, function (error, tweet, response) {
        console.log("Tweet posted successfully!")
    });
}); 

http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337');
});