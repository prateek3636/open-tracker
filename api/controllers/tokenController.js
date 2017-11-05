'use strict';


var mongoose = require('mongoose'),
    requestIp = require('request-ip'),
    crypto = require('crypto'),
    fs = require('fs'),
    parser = require('ua-parser-js'),
    url = require('url'),
    Token = mongoose.model('token');

//Global variable for rendering
var notFoundJson = {
    "message":"no data found"
}


//function for creating new token
exports.createToken = function(req, res) {
    var tokenString = crypto.randomBytes(20).toString('hex');
    var newToken = new Token();
    newToken.title = req.body.title;
    newToken.last_updated = new Date();
    newToken.token = tokenString;
    newToken.save(function(err, token) {
        if (err)
            res.send(err);
        res.json(token);
    });
};

//function for store the information of clients
exports.openToken = function(req, res) {
    var ua = parser(req.headers['user-agent']);
    var browserName = ua["browser"].name;
    var browserVersion = ua["browser"].version;
    var userAgent = req.header('user-agent');
    var clientIpString = requestIp.getClientIp(req);
    var clientIp = clientIpString.split(":")[clientIpString.split(":").length-1];

    Token.findOne({token: req.params.token}, function(err, token) {
        if (err){
            //If error found then just render the error
            res.send(err);
        }
        var id = token._id;
        var isIpFound = false;
        if(token.opens && token.opens.length > 0){
            for(var i=0; i<token.opens.length; i++){
                if(token.opens[i].ip === clientIp && token.opens[i].browser === browserName
                    && token.opens[i].browserVersion === browserVersion){

                    token.opens[i].counter = token.opens[i].counter+1;
                    token.opens[i].last_updated = new Date();
                    isIpFound = true;
                    break;
                }
            }
        }
        if(!isIpFound){
            var openObj = {
                user_agent : userAgent,
                browser : browserName,
                browserVersion : browserVersion,
                ip : clientIp,
                counter : 1,
                last_updated : new Date()
            };
            if(token.opens === undefined){
                token.opens = [];
            }
            token.opens.push(openObj);
        }
        token.is_token_clicked = true;
        token.last_updated = new Date();
        var tokenToUpdate = new Token(token);

        Token.findByIdAndUpdate(id, tokenToUpdate, function(error, updatedToken) {
            if(error) {
                //If error found then just render the error
                res.send(err);
            }

            var img = fs.readFileSync('./images/smiley.gif');
            res.writeHead(200, {'Content-Type': 'image/gif' });
            res.end(img, 'binary');

        });
    });

};

//function for creating stats
exports.createStats = function (req, res) {
    var query = url.parse(req.url,true).query;
    var toDate = new Date( Date.parse(query.to) );
    var fromDate = new Date( Date.parse(query.from) );
    Token.find({"is_token_clicked":true, 'date_created':{$gt: fromDate, $lt:toDate}}, function(err, tokenList) {
        if (err){
            res.send(err);
        }
        if (tokenList.length === 0){
            res.json(notFoundJson);
            return;
        }
        var outPutList = [];
        for(var i=0; i<tokenList.length; i++){
            var tokenObj = {};
            tokenObj["title"] = tokenList[i].title;
            tokenObj["token"] = tokenList[i].token;
            var totalCounts = 0;
            for(var j=0; j<tokenList[i].opens.length; j++){
                totalCounts = totalCounts + tokenList[i].opens[j].counter;
            }
            tokenObj["totalCounts"] = totalCounts;
            tokenObj["uniqueCounts"] = tokenList[i].opens.length;
            outPutList.push(tokenObj)
        }
        res.json(outPutList);
    });
};

//function for event log
exports.eventLog = function (req, res) {
    Token.findOne({token: req.params.token}, function(err, token) {
        if (err) {
            res.send(err);
        }
        res.json(token);
    });
};

