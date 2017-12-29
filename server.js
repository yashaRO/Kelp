const bodyParser = require('body-parser')
const path = require('path');
const express = require('express');
const app = express();
const request = require('request');
const cors = require('cors')
const yelpApiKey = require('./keys/yelpKey.js').apiKey
//const firebase = require('firebase')

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser())
app.use(cors())

app.get('/ping', function(req, res) {
  let authObj = {
    'auth': {
      'bearer': yelpApiKey
    }
  }
  
  request('https://api.yelp.com/v3/businesses/search?term=food&location=77009', authObj, function(error, response, body) {
    console.log('error:', error)
    console.log('statusCode:', response && response.statusCode)
    res.type('json').send(body)
  })
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(function(req, res, next) {
  res.status(500).send('Something broke!')
})

app.listen(process.env.PORT || 3007);