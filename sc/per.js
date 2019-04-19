const express = require('express')
const helmet = require('helmet')
const fetch = require('node-fetch')
const app = express()

// add some security-related headers to the response
app.use(helmet())

app.get('*', async function (req, res) {
   res.type('png');
   let data = await fetch('http://lorempixel.com/1920/1080/')
    .then(res1 => res1.buffer()).then(buffer => {return buffer});
    res.send(data)
});

module.exports = app
