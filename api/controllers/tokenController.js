'use strict';


var mongoose = require('mongoose'),
    requestIp = require('request-ip'),
    crypto = require('crypto'),
    Token = mongoose.model('token');

exports.createToken = function(req, res) {
    var tokenString = crypto.randomBytes(20).toString('hex');
    var newToken = new Token();
    newToken.last_updated = new Date();
    newToken.token = tokenString;
    newToken.save(function(err, token) {
        if (err)
            res.send(err);
        res.json(token);
    });
};

exports.openToken = function(req, res) {
    console.log(req.params);
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
                if(token.opens[i].ip === clientIp && token.opens[i].user_agent === userAgent){
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

            res.json(updatedToken);
        });
    });

};

exports.createStats = function (req, res) {
    Token.find({"is_token_clicked":true}, function(err, tokenList) {
        if (err){
            res.send(err);
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

exports.eventLog = function (req, res) {
    Token.findOne({token: req.params.token}, function(err, token) {
        if (err) {
            res.send(err);
        }
        res.json(token);
    });
};

