const express = require('express')
const helmet = require('helmet')
const fetch = require('node-fetch')
const app = express()

// add some security-related headers to the response
app.use(helmet())

app.get('*', async function (req, res) {
   let type = req.query.type
   if(!type){
       type=1
   }
   let response = await fetch('https://www.bing.com/HPImageArchive.aspx?format=js&idx='+type+'&n=1', {
                    method: 'get'
                })
                .then(res1 => res1.json())
                .then(json => {
                    console.info(json.images[0].url)
                    return 'https://www.bing.com'+json.images[0].url
                })
                .catch(res2 => {
                    return 'https://www.bing.com/th?id=OHR.HopeValley_ZH-CN2208363231_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
                });
    res.send(response)
});
app.post('*', async function (req, res) {
   let type = req.body.type
   if(!type){
       type=1
   }
   let response = await fetch('https://www.bing.com/HPImageArchive.aspx?format=js&idx='+type+'&n=1', {
                    method: 'get'
                })
                .then(res1 => res1.json())
                .then(json => {
                    console.info(json.images[0].url)
                    return 'https://www.bing.com'+json.images[0].url
                })
                .catch(res2 => {
                    return 'https://www.bing.com/th?id=OHR.HopeValley_ZH-CN2208363231_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
                });
    res.send(response)
});

module.exports = app
