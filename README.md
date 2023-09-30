# open-source-auth

## Project Description:

This is an open-source project that providers a basic user authorization module for 
cloud-based applications that are hosted by Heroku (a platform as a service or PaaS). 

Below you will find important variables to consider throughout setup and deployment in Heroku 
in addition to snippets of code that will guide you in utilizing the features built into the 
authorization system

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Table of Contents
- [Installation](##Installation)
- [Configuration](##Configuration)
- [API Endpoints](##Api-endpoints)
- [Contributing](##Contributing)
- [License](##License)

## Installation

A pre-requisite to making use of this project/authorization system is having access to the services provided by 
Heroku. Deployment into Heroku is supported through GitHub's website (see module below the project description). 
Deployment can be accomplished via use of this module, or by following the manual setup instructions using a 
terminal and following the instructions at this [link](https://devcenter.heroku.com/articles/git).

## Configuration

Following deployment into Heroku you will need to manually configure environment variables for proper connection 
to the database, discord, and the API. Below are the minimum variable requirements for your project to make use 
of the authorization system. To navigate to the 'config vars' in the Heroku application follow the directions 
at this [link](https://devcenter.heroku.com/articles/config-vars).


* Add all DATABASE information to 'Config Vars' on Heroku application:

```
DB_USERNAME=
DB_PASSWORD=
HOST=
DB_PORT=
DB_NAME=
NODE_TLS_REJECT_UNAUTHORIZED=0
```

* Add all DISCORD information to 'Config Vars' on Heroku application:

```
BOT_TOKEN=
PREFIX=!
GUILD_ID=
ROLE_ID=
```

* Add all API information to 'Config Vars' on Heroku application:

```
API_BASE=http://127.0.0.1:5000 (api base is just the base url of your site, make sure there is no / on the end)
API_KEY=api-key-here
```

## API Endpoints

Below are quick demonstrations/specifications for the API features included in the authorization system.

### Binds a user
```javascript
var options = {
                url: `${process.env.API_BASE}/api/bind/user`,
                method: "POST",
                body: {
                  key: key,
                  userID: userID,
                },
                json: true,
                headers: {
                  apiKey: process.env.API_KEY,
                },
            };
```

### Unbinds a user
```javascript
var options = {
                url: `${process.env.API_BASE}/api/unbind/user`,
                method: "POST",
                body: {
                  key: key,
                  userID: userID,
                },
                json: true,
                headers: {
                  apiKey: process.env.API_KEY,
                },
            };
```

### Resets a users machine
```javascript
var options = {
                url: `${process.env.API_BASE}/api/reset/machine`,
                method: "POST",
                body: {
                  key: key,
                },
                json: true,
                headers: {
                  apiKey: process.env.API_KEY,
                },
            };
```

### Sets a users machine
```javascript
var options = {
                url: `${process.env.API_BASE}/api/set/machine`,
                method: "POST",
                body: {
                  key: key,
                  machine: machine
                },
                json: true,
                headers: {
                  apiKey: process.env.API_KEY,
                },
            };
```

### Returns all info on a specific user (by user id)
```javascript
var options = {
                url: `${process.env.API_BASE}/api/key`,
                method: "POST",
                body: {
                  userID: userID,
                },
                json: true,
                headers: {
                  apiKey: process.env.API_KEY,
                },
            };
```

### Returns all info on a specific user (by key)
```javascript
var options = {
                url: `${process.env.API_BASE}/api/key`,
                method: "POST",
                body: {
                  key: key
                },
                json: true,
                headers: {
                  apiKey: process.env.API_KEY,
                },
            };
```


### Inserts a key into the database
```javascript
var options = {
                url: `${process.env.API_BASE}/api/insert/key`,
                method: "POST",
                body: {
                  type: type,
                },
                json: true,
                headers: {
                  apiKey: process.env.API_KEY,
                },
            };
```

### Lists all users in the database
```javascript
var options = {
                url: `${process.env.API_BASE}/api/list/users`,
                method: "GET",
                json: true,
                headers: {
                  apiKey: process.env.API_KEY,
                },
            };
```

## Contributing

To contribute please reach out to the original owner of the repository [@CharlieAIO](https://github.com/CharlieAIO).

## License

This project is currently not formally licensed, please refer to this [link](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository) for more information.
