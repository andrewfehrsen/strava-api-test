'use strict';

// simple express server
var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static('app'));
app.get('/', function(req, res) {
    res.sendfile('./app/index.html');
});

app.listen(5000);

// const express = require('express');
// const app = express();
// const strava = require('strava-v3');
// // app.get('/', (req, res) => res.render('app'));
// app.get('/', (req, res) => res.send('poop'));
// app.listen(3003, () => console.log('Example app listening on port 3003!'))

// app.get("/search", function(req, res) {

// 	strava.athlete.get({id:275255},function(err,payload,limits) {
// 		if(!err) {
// 			console.log(payload);
// 		}
// 		else {
// 			console.log(err);
// 		}
// 	});
// });



