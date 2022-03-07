const express = require('express');
const redisRoute = express.Router();

redisRoute.route('/').get((req, res) => {
    console.log("routed to default")
    res.json("response")
});

redisRoute.route('/connectToInstance?:url').get(async(req, res) => {

    res.json('result')
});

module.exports = redisRoute;