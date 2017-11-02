'use strict';


var mongoose = require('mongoose'),
    requestIp = require('request-ip'),
    Task = mongoose.model('token');

exports.list_all_tasks = function(req, res) {
    Task.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.openToken = function(req, res) {
    console.log(req.params);
    var userAgent = req.header('user-agent');
    var clientIpString = requestIp.getClientIp(req);
    var clientIp = clientIpString.split(":")[clientIpString.split(":").length-1];
    // var clientIp = "2";

    Task.findOne({token: req.params.token}, function(err, task) {
        if (err){
            //If error found then just render the error
            res.send(err);
        }
        var id = task._id;
        var isIpFound = false;
        if(task.opens && task.opens.length > 0){
            for(var i=0; i<task.opens.length; i++){
                if(task.opens[i].ip === clientIp && task.opens[i].user_agent === userAgent){
                    task.opens[i].counter = task.opens[i].counter+1;
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
            if(task.opens === undefined){
                task.opens = [];
            }
            task.opens.push(openObj);
        }
        task.is_token_clicked = true;
        var task1 = new Task(task);

        Task.findByIdAndUpdate(id, task1, function(error, updatedTask) {
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
    var new_task = new Task(req.body);
    new_task.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_task = function(req, res) {
    Task.findById(req.params.taskId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_task = function(req, res) {
    Task.remove({
        _id: req.params.taskId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};