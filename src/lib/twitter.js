/**
 * Created by osho on 3/11/17.
 */
var request = require('request');
var config = require("../config");
var express = require('express');
var rp = require('request-promise');
var router = express.Router();
var initial_bearer = config.consumer_key+":"+config.consumer_secret;
var encoded_bearer = new Buffer(initial_bearer).toString('base64');

function getTweets(bearer_token) {
    var options = {
        method: 'GET',
        qs:{"user_id":config.user_id},
        headers: {
            'Authorization':'Bearer '+bearer_token,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        url: 'https://api.twitter.com/1.1/statuses/user_timeline.json'
    };
     return rp(options);
}

router.get('/', function(req, res, next) {
    var options = {
        method: 'POST',
        headers: {
            'Authorization':'Basic '+encoded_bearer,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        uri: 'https://api.twitter.com/oauth2/token',
        form: {'grant_type':'client_credentials'}
    };

    rp(options, function (err, body, response) {
        if(err){
            console.log("Error "+ err);
        } else {
            var parsed_response = JSON.parse(response);
            var bearer = parsed_response.access_token;
            var statuses = getTweets(bearer);
            statuses.then(function (status) {
                var tweets = [];
                var result = JSON.parse(status);
                result.forEach(function (tweet) {
                    tweets.push(tweet.text);
                });
               res.send({"status":"success", "data":{"platform":"twitter","tweets":tweets}});
            });
        }
    });
});

module.exports = router;




