const express = require('express')
const helmet = require('helmet')
const fetch = require('node-fetch')
const app = express()

// add some security-related headers to the response
app.use(helmet())

app.get('*', async function (req, res) {
    let type = req.query.type
    let url = req.query.url
    let response
    if(!!url && url.startsWith('http')){
        if ('b' === type) {
            const body = {
                url: url
            };
            response = await fetch('https://dwz.cn/admin/v2/create', {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Token': '590da538da07fe1c5dbe51890f81d016'
                    },
                })
                .then(res1 => res1.json())
                .then(json => {
                    if (json.Code === 0) {
                        return json.ShortUrl
                    } else {
                        return json.ErrMsg
                    }
                })
                .catch(res2 => {
                    console.log(res2)
                    return 'ok'
                });
        } else {
            response = await fetch('http://api.t.sina.com.cn/short_url/shorten.json?source=3271760578&url_long=' + url)
                .then(res1 => res1.json())
                .then(json => {
                    return json[0].url_short
                }).catch(res2 => {
                    console.log(res2)
                    return 'ok'
                });
        }
    
    }else{
        response='网址路径不正确'
    }
    res.send(response)
});
app.post('*', async function (req, res) {
    let type = req.body.type
    let url = req.body.url
    let response
    if(!!url&&url.startsWith('http')){
        if ('b' === type) {
            const body = {
                url: url
            };
            response = await fetch('https://dwz.cn/admin/v2/create', {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Token': '590da538da07fe1c5dbe51890f81d016'
                    },
                })
                .then(res1 => res1.json())
                .then(json => {
                    if (json.Code === 0) {
                        return json.ShortUrl
                    } else {
                        return json.ErrMsg
                    }
                })
                .catch(res2 => {
                    console.log(res2)
                    return 'ok'
                });
        } else {
            response = await fetch('http://api.t.sina.com.cn/short_url/shorten.json?source=3271760578&url_long=' + url)
                .then(res1 => res1.json())
                .then(json => {
                    return json[0].url_short
                }).catch(res2 => {
                    console.log(res2)
                    return 'ok'
                });
        }
    }else{
        response='网址不正确'
    }
    res.send(response)
});

module.exports = app
