const bodyParser = require('body-parser')
const path = require('path');
const express = require('express');
const app = express();
const request = require('request');
const cors = require('cors')
const apiKeys = require('./keys/apiKeys')

//for Yelp
const authObj = {
  'auth': {
    'bearer': apiKeys.yelpKey
  }
}

//const firebase = require('firebase')
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.text());// allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}))
app.use(cors())

app.post('/search', function(req, res) {
  
  let location = req.body.location || 77009
  let price = req.body.price ? 'price=' + req.body.price : ''
  request('https://api.yelp.com/v3/businesses/search?term=food&location=' + location + price, authObj, function(error, response, body) {
    console.log('error:', error)
    console.log('statusCode:', response && response.statusCode)
    return res.type('json').send(body)
  })
});

app.get('/business/:id', function(req, res) {

  request('https://api.yelp.com/v3/businesses/' + req.params.id, authObj, function(error, response, body) {
    console.log('error:', error)
    console.log('statusCodell:', response && response.statusCode)
    if (response.statusCode >= 400) {
      console.log('bad')
      return res.status(response.statusCode).send()
    }
    console.log('good')
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