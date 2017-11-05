Welcome to Open Tracker
===================


Below are the details of application Details. This application is an API app which serve all the required APIs. Below are the required informations -

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

1 - Checkout/Clone the codebase

2 - Go to the route Directory -  open-tracker 

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
 - Type - POST
 - Request Body- "title" : "sparkline" (optional)   
 - Description - This API is used for creating the unique token for given title. Once this api is hit, It will create an entry in mongo with **"is_token_clicked":false** and create an empty array **"opens":[]**. We will use this empty array to store the information of clients when token url has been hit. Here title is optional. 
 - DB Entry - 
 
  ```json
 {
	"_id" : ObjectId("59fc68ed05008f5e2a003316"),
	"token" : "b89e04898bb4f3e5b3ae5d0b9a69c171ddc47766",
	"last_updated" : ISODate("2017-11-03T13:02:37.680Z"),
	"title" : "sparkline",
	"opens" : [ ],
	"is_token_clicked" : false,
	"date_created" : ISODate("2017-11-03T13:02:37.675Z"),
	"__v" : 0
}
```
 
 -  Response - 200 OK

 ```json
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
```

**2 - Route visited by end-clients**
	
 - URL - http://localhost:3000/token/open/b89e04898bb4f3e5b3ae5d0b9a69c171ddc47766
 -  Type - GET
 - Description - This API is used when end client visit on the token url. Once this api is hit, It will update an entry in mongo with **"is_token_clicked":true** and push client details in array **"opens":[]**. 
 - DB Entry - 
 
  ```json
  {
	"_id" : ObjectId("59fc68ed05008f5e2a003316"),
	"token" : "b89e04898bb4f3e5b3ae5d0b9a69c171ddc47766",
	"last_updated" : ISODate("2017-11-03T13:04:37.680Z"),
	"title" : "sparkline",
	"opens" : [ 
		{
            "user_agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36", 
            "browser" : "Chrome", 
            "browserVersion" : "61.0.3163.100", 
            "ip" : "192.168.0.21", 
            "last_updated" : ISODate("2017-11-03T12:18:14.124+0000"), 
            "date_created" : ISODate("2017-11-03T11:50:41.686+0000"), 
            "counter" : NumberInt(1)
        }
	],
	"is_token_clicked" : true,
	"date_created" : ISODate("2017-11-03T13:02:37.675Z"),
	"__v" : 0
 }
 ```
   
 -  Response - After clicking server will return GIF image to the client. Below is the response.
 
![enter image description here](https://github.com/prateek3636/open-tracker/blob/master/images/Screen%20Shot%202017-11-05%20at%2012.23.23%20PM.png)
 

**3 - Route for accessing stats**
	
 - URL - http://localhost:3000/token/stats?from=11/03/2017 11:50:25&to=11/04/2017 11:50:25
 - Type - GET
 - Description - This API is used for get the stats of tokens. It will return the token stats which is only opened by at-least one client. This API will response all the tokens stats provided by time interval. Currently it only support date formats mm-dd-yyyy HH:mm:ss
   
 -  Response - 200 OK
 
 
 ```json
    [
    {
        "title": "sparkline",
        "token": "b89e04898bb4f3e5b3ae5d0b9a69c171ddc47766",
        "totalCounts": 7,
        "uniqueCounts": 2
    },
    {
        "title": "nokia",
        "token": "4e1ldce3er2aebg2e1d3ae60a2qwe6hbe3debfq",
        "totalCounts": 49,
        "uniqueCounts": 23
    }
   ]
   ```


**4 - Route for accessing detailed event logs (for one token)**
	
 - URL - http://localhost:3000/token/eventLog/b89e04898bb4f3e5b3ae5d0b9a69c171ddc47766
 -  Type - GET
 - Description - This API is used for get the event logs of an token. It will provide all the data of toke. We can track that which day token is created and all the opened information (date, ip, browser, etc) of token by clients.   
   
 -  Response - 200 OK

    ```json
    {
    "_id": "59fc5801b707805c92d0bb90",
    "token": "b89e04898bb4f3e5b3ae5d0b9a69c171ddc47766",
    "last_updated": "2017-11-05T06:27:33.039Z",
    "title": "sparkline",
    "__v": 0,
    "opens": [
        {
            "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
            "browser": "Chrome",
            "browserVersion": "61.0.3163.100",
            "ip": "1",
            "last_updated": "2017-11-03T12:18:14.124Z",
            "date_created": "2017-11-03T11:50:41.686Z",
            "counter": 4
        },
        {
            "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:56.0) Gecko/20100101 Firefox/56.0",
            "browser": "Firefox",
            "browserVersion": "56.0",
            "ip": "1",
            "last_updated": "2017-11-05T06:27:33.039Z",
            "date_created": "2017-11-03T11:50:58.694Z",
            "counter": 3
        }
    ],
    "is_token_clicked": true,
    "date_created": "2017-11-03T11:50:25.239Z"
    }
    ```

 
    

 

