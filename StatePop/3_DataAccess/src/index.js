
var Alexa = require('alexa-sdk');

var https = require('https');

exports.handler = function(event, context, callback){

    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();

};

var handlers = {
    'LaunchRequest': function () {
        var say = 'Welcome!';
        this.emit(':ask', say, 'try again');
    },

    'StateRequestIntent': function() {
        var myState = this.event.request.intent.slots.usstate.value;
        var say = '';

        // create and store session attributes
        if (!this.attributes['myList']) {
            this.attributes['myList'] = [];  // empty array
        }

        this.attributes['myList'].push(myState);  // add array element

        var that = this;

        getPopFromArray(myState, function(pop) {
     // getPopFromAPI(myState, function(pop) {

            say = 'The population of ' + myState + ' is ' + pop;
            that.emit(':ask', say, 'try again');
        });

    },
    'MyNameIsIntent': function() {

        var myName = this.event.request.intent.slots.myName.value;

        // create and store session attributes
        this.attributes['myName'] = myName;
        var say = 'Hi ' + myName + '!';

        this.emit(':ask', say, 'try again');
    },
    'RecapIntent': function() {

        // create and store session attributes
        if (!this.attributes['myList']) {
            this.attributes['myList'] = [];  // empty array
        }

        var stateList  = this.attributes['myList'].toString();  // add array element
        var stateCount =  this.attributes['myList'].length;

        var say = 'Your list has the following ' + stateCount + ' states. ' + stateList;

        this.emit(':ask', say, 'try again');
    },

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'Say the name of a U.S. State.', 'try again');
    },

    'AMAZON.StopIntent': function () {
        var say = '';
        var myName = '';
        if (this.attributes['myName'] ) {
            myName = this.attributes['myName'];
        }
        say = 'Goodbye, ' + myName;

        this.emit(':tell', say );
    }
}
// end of handlers

// ---------------------------------------------------  User Defined Functions ---------------

function getPopFromArray (myState, callback) {
    var population = 0;
    var rank = 0;

    var dataset = require('./datafiles/dataset.js');  // separate file also deployed to Lambda in ZIP archive

    for (var i = 0; i < dataset.length; i++) {
        if (dataset[i].Name.toLowerCase() === myState.toLowerCase() ) {
            population = dataset[i].population;
            rank = dataset[i].rank;

        }
    }
    callback(population);
}

function getPopFromAPI (myState, callback) {
    var population = 0;
    var rank = 0;

    var post_data = {"usstate": myState};

    var post_options = {
        host:  'rmwum5l4zc.execute-api.us-east-1.amazonaws.com',
        port: '443',
        path: '/prod/stateresource',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(post_data))
        } 
    };
    var post_req = https.request(post_options, function(res) {
        res.setEncoding('utf8');
        var returnData = "";
        res.on('data', function (chunk) {
            returnData += chunk;
        });
        res.on('end', function () {
            // this particular API returns a JSON structure:
            // returnData: {"usstate":"Delaware","attributes":[{"population":900000},{"rank":45}]}

            population = JSON.parse(returnData).attributes[0].population;

            callback(population);

        });
    });
    post_req.write(JSON.stringify(post_data));
    post_req.end();

}