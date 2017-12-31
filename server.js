const bodyParser = require('body-parser')
const path = require('path');
const express = require('express');
const app = express();
const request = require('request');
const cors = require('cors')
const authObj = {
  'auth': {
    'bearer': require('./keys/yelpKey.js').apiKey
  }
}
  
//const firebase = require('firebase')
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser())
app.use(cors())

app.get('/search', function(req, res) {
  
  request('https://api.yelp.com/v3/businesses/search?term=food&location=77009', authObj, function(error, response, body) {
    console.log('error:', error)
    console.log('statusCode:', response && response.statusCode)
    return res.type('json').send(body)
  })
});

app.get('/business/:id', function(req, res) {
  
  request('https://api.yelp.com/v3/businesses/' + req.params.id, authObj, function(error, response, body) {
    console.log('error:', error)
    console.log('statusCode:', response && response.statusCode)
    return res.type('json').send(body)
  })
  //res.status(200).send()
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(function(req, res, next) {
  res.status(500).send('Something broke!')
})

app.listen(process.env.PORT || 3007);