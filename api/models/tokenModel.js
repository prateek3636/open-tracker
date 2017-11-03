'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TokenSchema = new Schema({
    title: {
        type: String
    },
    token: {
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    last_updated: {
        type: Date
    },
    is_token_clicked: {
        type: Boolean,
        default: false
    },
    opens : [{
        user_agent : String,
        browser : String,
        browserVersion : String,
        ip : String,
        counter : {
            type: Number,
            default: 0
        },
        date_created : {
            type: Date,
            default: Date.now
        },
        last_updated : {
            type: Date
        },
        _id: false,
        id: false
    }]
});

module.exports = mongoose.model('token', TokenSchema);