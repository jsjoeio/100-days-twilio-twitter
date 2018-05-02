const http = require('http')
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 1337
const { google } = require('googleapis')
const API_URL = 'https://dm-meeting-app.firebaseio.com/round4.json'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

/* Twitter API */
const Twitter = require('twitter')
const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

/* Twilio Credentials */
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

/* Google Firebase API */
let bearerAccessToken
const serviceAccount = require('./serviceAccountKey.json')
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/firebase.database'
]
const jwtClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  scopes
)
jwtClient.authorize(function(error, tokens) {
  if (error) {
    console.log('Error making request to generate access token:', error)
  } else if (tokens.access_token === null) {
    console.log(
      'Provided service account does not have permission to generate access tokens'
    )
  } else {
    const accessToken = tokens.access_token
    setAccessToken(accessToken)
  }
})

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

function setAccessToken(accessToken) {
  bearerAccessToken = accessToken
}

app.post('/sms', (req, res) => {
  if (req.body.From === process.env.PHONE_NUMBER) {
    getMessage(req).then(messageObject => {
      postTweet(messageObject)
    })

    res.set('Content-Type', 'application/xml')
    res.send('<Response/>')
  }
})

async function getMessage(req) {
  /* Set the round that you're on here: */
  const round = 4

  /* Set the hashtag you want to use here: */
  const hashTag = '#100DaysOfCode'

  const messageObject = {}
  const previousDay = await getDayCount().then(daysObject => {
    if (daysObject !== null) {
      let objectId = Object.keys(daysObject)[Object.keys(daysObject).length - 1]
      return daysObject[objectId].day
    } else {
      return 0
    }
  })
  const currentDay = previousDay + 1
  const todaysDate = getTodaysDate(new Date())
  const text = req.body.Body
  messageObject.tweet = `R${round}|D${currentDay}:\n${text} \n${hashTag}`
  messageObject.day = currentDay
  messageObject.date = todaysDate
  return messageObject
}

function getDayCount() {
  return axios
    .get(API_URL, { headers: { Authorization: `Bearer ${bearerAccessToken}` } })
    .then(function(response) {
      return response.data
    })
    .catch(function(error) {
      console.log(error)
    })
}

function getTodaysDate(today) {
  const day = today.getDate()
  const month = today.getMonth() + 1 //January is 0
  const year = today.getFullYear()
  return `${month}/${day}/${year}`
}

function postTweet(messageObject) {
  twitterClient
    .post('statuses/update', {
      status: messageObject.tweet
    })
    .then(function(tweet) {
      let message = 'Tweet posted successfully! 😄'
      sendText(message)
      postTweetToDB(messageObject)
    })
    .catch(function(error) {
      let message = `Uh oh...Looks like we got an error. Tweet not posted :(`
      sendText(message)
      console.log(`Error: ${JSON.stringify(error)}`)
    })
}

function postTweetToDB(messageObject) {
  axios
    .post(API_URL, messageObject, {
      headers: { Authorization: `Bearer ${bearerAccessToken}` }
    })
    .then(function(response) {
      console.log('Successfully posted tweet to DB.')
    })
    .catch(function(error) {
      console.log(error)
    })
}

function sendText(message) {
  client.messages
    .create({
      to: process.env.PHONE_NUMBER,
      from: process.env.TWILIO_NUMBER,
      body: message
    })
    .then(message => console.log(message.sid))
}

http.createServer(app).listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}. Let's get coding 🎉 !`)
})
