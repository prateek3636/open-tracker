'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TokenSchema = new Schema({
    title: {
        type: String     //Title for the token
    },
    token: {
        type: String     // Alpha numeric Random generated token of length 48
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
        user_agent : String,        //  User Agent Info
        browser : String,           //  Browser Name
        browserVersion : String,    //  Browser version
        ip : String,                //  Client IP
        counter : {
            type: Number,           //  This counter is maintain the counts for same client request
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

//exporting the modal schema
module.exports = mongoose.model('token', TokenSchema);