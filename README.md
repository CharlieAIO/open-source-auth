# open-source-auth

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


* Add all db information to Config Vars on heroku app:

DB_USERNAME=
DB_PASSWORD=
HOST=
DB_PORT=
DB_NAME=
NODE_TLS_REJECT_UNAUTHORIZED=0

* Add all discord information to Config Vars on heroku app:
BOT_TOKEN=
PREFIX=!
GUILD_ID=
ROLE_ID=

* Add all API information to Config Vars on heroku app:
API_BASE=http://127.0.0.1:5000 (api base is just the base url of your site, make sure there is no / on the end)
API_KEY=api-key-here


## API

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
