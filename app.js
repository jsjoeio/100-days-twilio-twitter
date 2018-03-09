const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 1337;
const Twitter = require('twitter');

const client = new Twitter{
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
}

const app = express();

app.use(bodyParser());

app.post('/sms', (req, res) => {
    //get the text message contents 
    let message = req.body.Body;
    
    console.log(`You received a message that says: ${message}`);

    client.post('statuses/update', { status: message })
        .then(function (tweet) {
            console.log(`Tweet posted successfully! Your tweet said: ${tweet}`)
        })
        .catch(function (error) {
            throw error;
        })
        
    res.set('Content-Type', 'application/xml');
    res.send('<Response/>')
}); 

http.createServer(app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});