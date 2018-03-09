const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 1337;
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
    //get the text message contents 
    let message = req.body.Body;
    console.log(`You received a message that says: ${message}`);
    Twitter.post('statuses/update', { "status": message }, function (error, tweet, response) {
        console.log(`Tweet posted successfully! Your tweet said: ${message}`)
    });
    res.set('Content-Type', 'application/xml');
    res.send('<Response/>')
}); 

http.createServer(app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});