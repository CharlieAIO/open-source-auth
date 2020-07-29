const express = require('express');
const dotenv = require('dotenv');
dotenv.config()

// Routes
const api = require('./routes/api');
const discord =require('./routes/discord');


const app = express(); //default app
app.use(express.json());

app.use('/api/', api)
app.use('/',discord)

app.listen(process.env.PORT, () => console.log(`Listening on port: ${process.env.port}`))