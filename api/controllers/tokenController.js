'use strict';


var mongoose = require('mongoose'),
    requestIp = require('request-ip'),
    Token = mongoose.model('token');

exports.list_all_tasks = function(req, res) {
    Token.find({}, function(err, token) {
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
    // var clientIp = "2";

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
                    isIpFound = true;
                    break;
                }
            }
        }
        if(!isIpFound){
            var openObj = {
                user_agent : userAgent,
                ip : clientIp,
                counter : 1
            };
            if(token.opens === undefined){
                token.opens = [];
            }
            token.opens.push(openObj);
        }
        token.is_token_clicked = true;
        var task1 = new Token(token);

        Token.findByIdAndUpdate(id, task1, function(error, updatedTask) {
            if(error) {
                //If error found then just render the error
                res.send(err);
            }

            // Render not found error
            if(!updatedTask) {
                return res.status(404).json({
                    message: 'Course with id can not be found.'
                });
            }

            res.json(updatedTask);
        });
    });

};




exports.createToken = function(req, res) {
    var new_task = new Token(req.body);
    new_task.save(function(err, token) {
        if (err)
            res.send(err);
        res.json(token);
    });
};


exports.createStats = function (req, res) {

};


exports.read_a_task = function(req, res) {
    Token.findById(req.params.taskId, function(err, token) {
        if (err)
            res.send(err);
        res.json(token);
    });
};


exports.update_a_task = function(req, res) {
    Token.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, token) {
        if (err)
            res.send(err);
        res.json(token);
    });
};


exports.delete_a_task = function(req, res) {
    Token.remove({
        _id: req.params.taskId
    }, function(err, token) {
        if (err)
            res.send(err);
        res.json({ message: 'Token successfully deleted' });
    });
};