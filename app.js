/**
 * Created by osho on 3/11/17.
 */
var bodyParser = require('body-parser');
var express = require('express');
var app = express()
var twitter = require('./src/lib/twitter')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var port = process.env.PORT || 3000;
app.listen(port);
console.log('.............\n App...\n Running on port ', port);



app.use('/twitter', twitter);
app.get('/', function (req, res) {
   res.send('woah woah you\'re probably lost. Visit oshoklinsmann.me instead');
});
