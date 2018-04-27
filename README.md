# 100-days-twilio-twitter

An app to help you keep track of your #100DaysOfCode progress. It keeps track of what day you're on, lets you send a text 📱 with what you worked on that day to post to Twitter🐦 and all you have to worry about is coding 🕺🏻💃🏻

## How does it work? 🤔

Using Twilio's API and Twitter's API, you send a text message to your Twilio phone number. You then configure it to make a POST request, which triggers the `app.js` which is built on Node.js and Express.js which then takes the body of the text message and tweets it.

## Getting Started 😀

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites ✅

Here's what you'll need:

```
node v9.8.0
npm 5.6.0
```

* Basic JavaScript/Node.js experience
* Cell phone with texting capabilities

### Installing 💻

In order to get everything set up correctly, follow the steps listed below:

1.  Clone or (fork this repo)[https://github.com/jjprevite/100-days-twilio-twitter#fork-destination-box] 🍴

```
git clone https://github.com/jjprevite/100-days-twilio-twitter.git
```

2.  Change directories into the root folder ➡️

```
cd 100-days-twilio-twitter
```

3.  Install the necessary dependencies 💿

```
npm install
```

4.  Update the `API_URL` variable to your project:

* `API_URL` will be your Firebase Database URL. It should look something like 'https://my-app.firebaseio.com/round1.json'

- Note: with Firebase, the database has a JSON-like structure. This is why we've added `round1.json` to the end of the root URL.

5.  Create a `.env` file inside the root using either your text editor or from the command line 📁

```
touch .env
```

We'll use this to store our environment variables, specifically API keys. Don't worry, the `.gitignore` file already includes a `.env` file so there's no risk of you accidentally exposing your API keys to the eyes of GitHub 😉

Here's what it should look like:

```
NODE_ENV=dev
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_ACCESS_TOKEN_KEY=
TWITTER_ACCESS_TOKEN_SECRET=
ACCOUNT_SID=
AUTH_TOKEN=
PHONE_NUMBER=
TWILIO_NUMBER=
```

6.  Get your variables and add them to your `.env` file 📝

* `TWITTER...` these four variables will come from your Twitter "app", which you set up at [https://apps.twitter.com/](https://apps.twitter.com/).

* `ACCOUNT_SID` and `AUTH_TOKEN` will come from your Twilio account.

* `PHONE_NUMBER` is your phone number or the number of the phone you'll be using to send texts

* `TWILIO_NUMBER` you'll need to "buy" a phone number from Twilio. When you sign up, you should receive some credit so you shouldn't need to actually spend money to get a number. Here's a [quick guide](https://support.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Purchase-Twilio-Phone-Numbers-from-Console) on how purchase a Twilio number.

7.  Generate and create a `serviceAccountKey.json` file to hold your Firebase key 🗝

Luckily, the Firebase documentation explains exactly how to do that. Follow [these instructions](https://firebase.google.com/docs/database/rest/auth#generate_an_access_token) to generate a new private key. After you generate it, you should get your `serviceAccountKey.json` file. Add that to the root directory. It will be used to authenticate our REST requests.

8.  Take a quick tea 🍵 break - we're almost there 😄

9.  Start your app by running this from the command line

```
npm run dev
```

If everything is working correctly, you should see the following printed to your node console:

```
Express server listening on port 1337. Let's get coding 🎉 !
```

![Time to dance](https://media.giphy.com/media/l3V0lsGtTMSB5YNgc/giphy.gif)

10. Expose your port using [ngrok](https://ngrok.com/) so we can connect our Node app with Twilio

* If you're on Mac, I recommend installing `ngrok` globally

```
npm install -g ngrok
```

Then run the following command in a new command line window to expose port 1337:

```
ngrok http 1337
```

If you're successful, you should see something like this:

![ngrok screenshot](https://i.imgur.com/WRJ2rZH.png)

11. Configure your Twilio number to listen for POST requests.

In order to do this we need to copy the forwarding URL from that command line window where `ngrok` is running. It should look something like this: `http://1962da97.ngrok.io` _It shouldn't matter if you use the `http` or `https` URl_

a. Open up the [Twilio console](https://www.twilio.com/console)
b. Navigate to your [Phone Numbers](https://www.twilio.com/console/phone-numbers/incoming)
c. Click the number you want to use
d. Scroll down to "Messaging"
e. Add your link to "A MESSAGE COMES IN" with `/sms` at the end. So it should look similar to:

![Adding ngrok URL to Twilio Phone Number](https://i.imgur.com/c5KWmx9.png)

🛑 **IMPORTANT** 🛑

> Because we are using the free version of ngrok. Anytime you start/stop `ngrok` you will get a new URL and have to go back in to Twilio's Console and add the new URL. Yes, this can be annoying for testing but if you want to upgrade, ngrok has a [$5/month tier](https://ngrok.com/pricing) where you get 3 reserved domains.

12. Send a text message to your Twilio phone number and check Twitter to see the magic happen 🧙🏼‍♂️

![Text message proof](https://i.imgur.com/hCjwP1E.png)
![Twitter tweet proof](https://i.imgur.com/AjIlovC.png)

13. Celebrate success 🕺🏻💃🏻

![success gif](https://media.giphy.com/media/2vA33ikUb0Qz6/giphy.gif)

## Deployment

_TODO: Add additional notes about how to deploy this on a live system_

## Built With

* [Firebase](https://firebase.google.com/)
* [Twilio](https://www.twilio.com/try-twilio)
* [Twitter](https://twitter.com/)
* [Twitter "App"](https://apps.twitter.com/)

## Contributing

_Please read [CONTRIBUTING.md](https://github.com/jjprevite/100-days-twilio-twitter/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests._

## Authors

* **Joe Previte** - [jjprevite](https://github.com/jjprevite)

## License

_This project is licensed under the MIT License - see the [LICENSE](https://github.com/jjprevite/100-days-twilio-twitter/blob/master/LICENSE) file for details_

## Acknowledgments

* The Twilio DevEd Team for creating [TwilioQuest](https://www.twilio.com/quest) to help me get up and running 🤗
* Alexander Kallaway @kallaway - the creator of #100DaysOfCode
* Hat tip to Billie Thompson - [PurpleBooth](https://github.com/PurpleBooth) for the README.md template 🎩
