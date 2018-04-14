const http = require('http');
const express = require('express');
const request = require('request');
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
  let day = getDayCount();
  if (req.body.From === process.env.PHONE_NUMBER) {
    //get the text message contents
    getDayCount();
    let text = req.body.Body;
    let message = `R${round}|D${day}:\n${text} \n#100DaysOfCode`;

    console.log(`You received a message that says: ${message}`);

    // twitterClient
    //   .post('statuses/update', {
    //     status: message
    //   })
    //   .then(function(tweet) {
    //     console.log(`Tweet posted successfully! Your tweet said: ${tweet}`);
    //   })
    //   .catch(function(error) {
    //     console.log(
    //       `Uh oh...Looks like we've got an error here: ${JSON.stringify(error)}`
    //     );
    //   });

    res.set('Content-Type', 'application/xml');
    res.send('<Response/>');
  }
});

//function 1
//get the day...

function getDayCount() {
  const options = {
    method: 'GET',
    url: 'https://dm-meeting-app.firebaseio.com/roundFour.json',
    headers: {
      'Cache-Control': 'no-cache'
    }
  };

  const currentDay = request(options, function(error, response, body) {
    if (error) throw new Error(error);
    let parsed = JSON.parse(body);
    let arrOfDayObjects = [];
    for (let dayObject in parsed) {
      arrOfDayObjects.push(parsed[dayObject]);
    }
    let currentDayObject = arrOfDayObjects[arrOfDayObjects.length - 1];
    return currentDayObject.day;
  });
  console.log('outside the request, currentDay is ', currentDay);
}

//function 2
//post to the DB...

http.createServer(app).listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});
