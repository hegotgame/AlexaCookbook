
var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){

    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();

};
var myList = ["keys", "cash", "i. d.", "phone"];

var handlers = {
    'LaunchRequest': function () {
        var say = 'Welcome! I will ask you if you remembered your ';
        var that = this;
        listReader(myList, "and", function(readingList) {
            say += readingList;
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

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'Just answer each question yes or no', 'try again');
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

function listReader(list, andor, callback) {
    var joinword = "and";
    var returnString = "";

    if (andor === "or") {
        joinword = "or";
    }
    console.log(typeof list);
    console.log(list.toString());


    for (var key in list) {
        console.log("item " + key + " is " + list[key]);
        return
    }

    callback(returnString);

}

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
