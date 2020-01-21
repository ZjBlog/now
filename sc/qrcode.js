const express = require('express')
const helmet = require('helmet')
const qr = require('qr-image');
const app = express()

// add some security-related headers to the response
app.use(helmet())

app.get('*', async function (req, res) {
    let text = req.query.text
    if(!text){
        text='https://bgcz.github.io'
    }
    var img = qr.image(text,{type:'png',ec_level:'H'});
    res.writeHead(200, {'Content-Type': 'image/png'});
    img.pipe(res);
});

module.exports = app
