Welcome to Open Tracker
===================


Below are the details of application related to technology and domain. This application is an API app which serve all the required APIs.

----------


Technology  User
-------------

1 - Node JS

2 - NPM

3 - Mongo DB


----------


Prerequisite and Installation
-------------------

To run the app, System need to be installed node, NPM and Mongo.
To run this app - 
1 - Checkout the codebase

2 - Go to the route Directory and run

3 - npm install

4 - npm run start


----------


Domain
-------------
Below are the domain structure and DB entry for a token - 

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
        counter : {                 //  This counter is maintain the counts for same client request
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



Now Below are the DB entries for two tokens in mongo - 


    { 
    "_id" : ObjectId("59fc5801b707805c92d0bb90"), 
    "token" : "7013dc21e12aeb72e0d3ae60a23aaa21be8dfb6f", 
    "last_updated" : ISODate("2017-11-03T12:41:29.806+0000"), 
    "title" : "sparkline", 
    "opens" : [
        {
            "user_agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36", 
            "browser" : "Chrome", 
            "browserVersion" : "61.0.3163.100", 
            "ip" : "192.168.0.243", 
            "last_updated" : ISODate("2017-11-03T12:18:14.124+0000"), 
            "date_created" : ISODate("2017-11-03T11:50:41.686+0000"), 
            "counter" : NumberInt(4)
        }, 
        {
            "user_agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:56.0) Gecko/20100101 Firefox/56.0", 
            "browser" : "Firefox", 
            "browserVersion" : "56.0", 
            "ip" : "192.168.0.243", 
            "last_updated" : ISODate("2017-11-03T11:50:58.693+0000"), 
            "date_created" : ISODate("2017-11-03T11:50:58.694+0000"), 
            "counter" : NumberInt(2)
        }
    ], 
    "is_token_clicked" : true, 
    "date_created" : ISODate("2017-11-03T11:50:25.239+0000"), 
    "__v" : NumberInt(0)
    },
    
    {
    "_id" : ObjectId("59fc612855f1a15d5eead71b"), 
    "token" : "479c06f69623b8b442e677f8ddeb980846deb8b0", 
    "last_updated" : ISODate("2017-11-03T12:29:28.829+0000"), 
    "title" : "Cricket Expo", 
    "opens" : [

    ], 
    "is_token_clicked" : false, 
    "date_created" : ISODate("2017-11-03T12:29:28.828+0000"), 
    "__v" : NumberInt(0)
    }

----------


APIs End Points and Details
--------------------

**1 - Route for token generation**
	

 - URL - http://localhost:3000/token/create
 - Description - This API is used for creating the unique token for given title. Here title is optional. 
 - Type - POST
 - Request - "title" : "sparkline" (optional)   
 -  Response - 200 OK

`
{
    "__v": 0,
    "token": "b89e04898bb4f3e5b3ae5d0b9a69c171ddc47766",
    "last_updated": "2017-11-03T13:02:37.680Z",
    "title": "sparkline",
    "_id": "59fc68ed05008f5e2a003316",
    "opens": [],
    "is_token_clicked": false,
    "date_created": "2017-11-03T13:02:37.675Z"
}
`
 
    

 

