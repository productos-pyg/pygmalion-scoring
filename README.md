## Robotics Competition Software

Version developed in MERN Stack (MongoDB, Express, React, NodeJS)

Author: Alejandro Martínez

---

## Installation

### API - Server

```
$ npm install
```

Create .env file and add the env vars

MONGODB_URI=''
JWT_SECRET=''
FACEBOOK_ID=''
FACEBOOK_SECRET=''
EMAIL_FROM=''
GOOGLE_ID=''
GOOGLE_SECRET=''
GMAIL_REFRESH_TOKEN=''

### Client - React

```
$ cd /client
$ npm install
```

## Deploy Heroku

Install the Heroku CLI
Download and install the Heroku CLI.

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

```
$ heroku login
````

Clone the repository
Use Git to clone scoring-robot-competitions's source code to your local machine.
```
$ heroku git:clone -a scoring-robot-competitions
$ cd scoring-robot-competitions
```

Deploy your changes
Make some changes to the code you just cloned and deploy them to Heroku using Git.

```
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```
