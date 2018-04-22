# 100-days-twilio-twitter
An app to help you keep track of your #100DaysOfCode progress. It keeps track of what day you're on, lets you send a text with what you worked on that day to post to Twitter and all you have to worry about it coding :) 😃

## How does it work?
Using Twilio's API and Twitter's API, you send a text message to your Twilio phone number. You then configure it to make a POST request, which triggers the `app.js` which is built on Node.js and Express.js which then takes the body of the text message and tweets it. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Here's what you'll need: 

```
node v9.8.0
npm 5.6.0
```

- (Firebase)[https://firebase.google.com/] account (free)
- (Twilio)[https://www.twilio.com/try-twilio] account (free)
- (Twitter)[https://twitter.com/signup?lang=en] account (free)
- (Twitter "App)[https://apps.twitter.com/] (free)
- Cell phone with texting abilities 

### Installing

In order to get everything set up correctly, follow the steps listed below: 

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
