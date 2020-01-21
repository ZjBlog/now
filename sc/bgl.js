const express = require('express')
const helmet = require('helmet')
const fetch = require('node-fetch')
const app = express()

// add some security-related headers to the response
app.use(helmet())

app.get('*', async function (req, res) {
    let randomMath=Math.random()*(3000-1+1)+1;
    let imgMath=Math.floor(randomMath);
    let url ='https://img.infinitynewtab.com/wallpaper/' + imgMath + '.jpg';
   res.type('jpg');
   let data = await fetch(url)
    .then(res1 => res1.buffer()).then(buffer => {return buffer});
    res.send(data)
});

module.exports = app
