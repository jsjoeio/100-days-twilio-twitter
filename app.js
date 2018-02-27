const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const TwitterPackage = require('twitter');

const secret = {
    consumer_key: 'ADD YOUR CONSUMER KEY',
    consumer_secret: 'ADD YOUR CONSUMER SECRET',
    access_token_key: 'ADD YOUR ACCESS TOKEN KEY',
    access_token_secret: 'ADD YOUR ACCESS TOKEN SECRET'
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