const express = require('express');
const dotenv = require('dotenv');
dotenv.config()

const api = require('./routes/api');
const discord =require('./routes/discord');

const app = express();

app.use(express.json());

app.use('/api', api)
app.use('/',discord)

app.listen(process.env.PORT || 5000, () => console.log(`Listening on port: ${process.env.port}`))