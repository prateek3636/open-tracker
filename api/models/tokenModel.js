'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TokenSchema = new Schema({
    title: {
        type: String,
        default: ""
    },
    token: {
        type: String,
        default: Math.random()*10000000000000000
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    last_updated: {
        type: Date,
        default: Date.now
    },
    is_token_clicked: {
        type: Boolean,
        default: false
    },
    opens : [{
        user_agent : String,
        ip : String,
        counter : {
            type: Number,
            default: 0
        },
        open_date : {
            type: Date,
            default: Date.now
        },
        _id: false,
        id: false
    }]
});

module.exports = mongoose.model('token', TokenSchema);