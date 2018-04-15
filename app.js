const http = require('http');
const express = require('express');
const axios = require('axios');
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
  // let day = getDayCount().then(response => {
  //   return response.data[0].day;
  // });
  if (req.body.From === process.env.PHONE_NUMBER) {
    //get the text message contents
    getMessage(req);

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

async function getMessage(req) {
  let round = 4;
  const { day } = await getDayCount().then(daysObject => {
    let objectId = Object.keys(daysObject)[Object.keys(daysObject).length - 1];
    return daysObject[objectId];
  });
  let text = req.body.Body;
  let message = `R${round}|D${day}:\n${text} \n#100DaysOfCode`;

  console.log(`You received a message that says: ${message}`);
}

function getDayCount() {
  return axios
    .get('https://dm-meeting-app.firebaseio.com/roundFour.json')
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
}

//function 2
//post to the DB...

http.createServer(app).listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});
