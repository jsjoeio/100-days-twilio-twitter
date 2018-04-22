# 100-days-twilio-twitter
An app to help you keep track of your #100DaysOfCode progress. It keeps track of what day you're on, lets you send a text 📱 with what you worked on that day to post to Twitter🐦 and all you have to worry about it coding 🕺🏻💃🏻

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

- [Firebase](https://firebase.google.com/) account (free)
- [Twilio](https://www.twilio.com/try-twilio) account (free)
- [Twitter](https://twitter.com/signup?lang=en) account (free)
- [Twitter "App"](https://apps.twitter.com/) (free)
- Cell phone with texting abilities 

### Installing 💻

In order to get everything set up correctly, follow the steps listed below: 

1. Clone or (fork this repo)[https://github.com/jjprevite/100-days-twilio-twitter#fork-destination-box] 🍴

```
git clone https://github.com/jjprevite/100-days-twilio-twitter.git
```

2. Change directories into the root folder ➡️

```
cd 100-days-twilio-twitter
```

3. Install the necessary dependencies 💿

```
npm install
```
4. Create a `.env` file inside the root using either your text editor or from the command line 📁

```
touch .env
```

We'll use this to store our environment variables, specifically API keys. Don't worry, the `.gitignore` file already includes a `.env` file so there's no risk of you accidentally exposing your API keys to the eyes of GitHub 😉

Here's what it should look like: 

```
NODE_ENV=dev
API_URL=
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_ACCESS_TOKEN_KEY=
TWITTER_ACCESS_TOKEN_SECRET=
ACCOUNT_SID=
AUTH_TOKEN=
PHONE_NUMBER=
TWILIO_NUMBER=
```

5. Get your variables and add them to your `.env` file 📝

- `API_URL` will be your Firebase Database URL. It should look something like 'https://my-app.firebaseio.com/roundOne.json'
* Note: with Firebase, we're not creating a "real" database, rather a JSON file that will store our tweets. This is why we've added `roundOne.json` to the end of the root URL.

- `TWITTER...` these four variables will come from your Twitter "app", which you set up at [https://apps.twitter.com/](https://apps.twitter.com/). 

- `ACCOUNT_SID` and `AUTH_TOKEN` will come from your Twilio account.

- `PHONE_NUMBER` is your phone number or the number of the phone you'll be using to send texts

- `TWILIO_NUMBER` you'll need to "buy" a phone number from Twilio. When you sign up, you should receive some credit so you shouldn't need to actually spend money to get a number. Here's a [quick guide](https://support.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Purchase-Twilio-Phone-Numbers-from-Console) on how purchase a Twilio number.

6. Generate and create a `serviceAccountKey.json` file to hold your Firebase key 🗝

Luckily, the Firebase documentation explains exactly how to do that. Follow [these instructions](https://firebase.google.com/docs/database/rest/auth#generate_an_access_token) to generate a new private key. After you generate it, you should get your `serviceAccountKey.json` file. Add that to the root directory. It will be used to authenticate our REST requests.

7. Take a quick tea 🍵 break - we're almost there 😄

8. Start your app by running the follow command from the command line

```
nodemon app.js
```
9. TODO

## Deployment

TODO: Add additional notes about how to deploy this on a live system

## Built With

TODO...
* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

TODO 

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

TODO

## Authors

TODO

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

TODO

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

TODO 

* Hat tip to anyone who's code was used
* Inspiration
* etc
