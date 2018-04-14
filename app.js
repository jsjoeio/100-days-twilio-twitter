const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 1337;
const Twitter = require('twitter');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const app = express();

app.use(bodyParser());

app.post('/sms', (req, res) => {
  let round = 4;
  let counter = 0;

  if (req.body.From === process.env.PHONE_NUMBER) {
    //get the text message contents
    let text = req.body.Body;
    let message = `R${round}|D${counter}:\n${text} \n#100DaysOfCode`;

    console.log(`You received a message that says: ${message}`);

    twitterClient
      .post('statuses/update', {
        status: message
      })
      .then(function(tweet) {
        console.log(`Tweet posted successfully! Your tweet said: ${tweet}`);
      })
      .catch(function(error) {
        console.log(
          `Uh oh...Looks like we've got an error here: ${JSON.stringify(error)}`
        );
      });

    res.set('Content-Type', 'application/xml');
    res.send('<Response/>');
  }
});

http.createServer(app).listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});
