
var Alexa = require('alexa-sdk');

var CallAPIs = require("./CallAPIs");

var config = {};
// config.CALL_FUNCTION            = "StatePop";
config.IOT_BROKER_ENDPOINT      = "a2eshrcp6u0y0c.iot.us-east-1.amazonaws.com".toLowerCase();
config.IOT_BROKER_REGION        = "us-east-1";
config.IOT_THING_NAME           = "waterPump";


exports.handler = function(event, context, callback){

    var alexa = Alexa.handler(event, context);
    // alexa.appId = "amzn1.echo-sdk-ams.app.8c97fc78-342a-4e4f-823b-e2f91e7f3474";
    alexa.registerHandlers(handlers, guessModeHandlers);
    alexa.execute();

};

var states = {
    GUESSMODE: '_GUESSMODE', // User is trying to guess the number.
    STARTMODE: '_STARTMODE'  // Prompt the user to start or restart the game.
};
var guessModeHandlers = Alexa.CreateStateHandler(states.GUESSMODE, {

        'sayIt': function (responseType, speechOutput, reprompt) {
            var Intent = {};
            if (this.event.request.type == "IntentRequest") {
                Intent = this.event.request.intent;
            } else {
                Intent = {"name": this.event.request.type};
            }

            var pload = {
                "intent": Intent,
                "attributes": this.event.session.attributes,
                "say": speechOutput
            };

            console.log("pload :");
            console.log(JSON.stringify(pload));

            CallAPIs.setShadow(pload, config, (status) => {

                console.log("set shadow and status is " + status);
            // that.emit(':ask', say, 'try again');
            // this.emit('sayIt', ':ask', say, 'try again');
            this.emit(responseType, speechOutput, reprompt);

        }
            )
            ;

        },

        'AMAZON.StopIntent': function () {
            var say = '';
            var myName = '';
            if (this.attributes['myName']) {
                myName = this.attributes['myName'];
            }
            say = 'Goodbye from State Pop , ' + myName;

            // this.emit(':tell', say );
            this.emit('sayIt', ':tell', say, 'try again');
        }
    }

);
var handlers = {
    'LaunchRequest': function () {
        var say = 'Welcome!';
        // this.emit(':ask', say, 'try again');
        this.emit('sayIt', ':ask', say, 'try again');
    },

    'sayIt': function(responseType, speechOutput, reprompt) {
        var Intent = {};
        if (this.event.request.type == "IntentRequest") {
            Intent = this.event.request.intent;
        } else {
            Intent = {"name" : this.event.request.type };
        }

        var pload = {"intent" : Intent,
            "attributes" : this.event.session.attributes,
            "say" : speechOutput
        };

        console.log("pload :")  ;
        console.log(JSON.stringify(pload));

        CallAPIs.setShadow(pload, config, (status) => {

                console.log("set shadow and status is " + status);
                // that.emit(':ask', say, 'try again');
                // this.emit('sayIt', ':ask', say, 'try again');
                this.emit(responseType, speechOutput, reprompt);

            }
        );

    },
    'StateRequestIntent': function () {
        var myState = this.event.request.intent.slots.usstate.value;
        var say = '';

        // create and store session attributes
        if (!this.attributes['myList']) {
            this.attributes['myList'] = [];  // empty array
        }

        this.attributes['myList'].push(myState);  // add array element

        var that = this;

        // getPopFromArray(myState, pop => {
        // CallAPIs.getPopMock(myState, pop => {
        CallAPIs.getPopFromArray(myState, pop => {
         // CallAPIs.getPopFromAPI_POST(myState, pop => {

            say = 'The population of ' + myState + ' is ' + pop;

            console.log("say = " + say);

            this.emit('sayIt', ':ask', say, 'try again');

        });
    },
    'MyNameIsIntent': function() {

        var myName = this.event.request.intent.slots.myName.value;
        var say = "";

        if (myName == null) { // no slot
            say = 'You can tell me your name, for example, you can say my name is Natasha.';
        } else {
            // create and store session attributes
            this.attributes['myName'] = myName;
            say = 'Hi ' + myName + '!';
        }

        this.emit('sayIt', ':ask', say, 'try again');
        // this.emit(':ask', say, 'try again');
    },
    'RecapIntent': function() {
        this.handler.state = states.GUESSMODE;

        // create and store session attributes
        if (!this.attributes['myList']) {
            this.attributes['myList'] = [];  // empty array
        }

        var stateList  = this.attributes['myList'].toString();  // add array element
        var stateCount =  this.attributes['myList'].length;

        var say = 'Your list has the following ' + stateCount + ' states. ' + stateList;

        // this.emit(':ask', say, 'try again');
        this.emit('sayIt', ':ask', say, 'try again');
    },

    'AMAZON.HelpIntent': function () {
        this.emit('sayIt', ':ask', 'Say the name of a U.S. State.', 'try again');
    },

    'AMAZON.StopIntent': function () {
        var say = '';
        var myName = '';
        if (this.attributes['myName'] ) {
            myName = this.attributes['myName'];
        }
        say = 'Goodbye, ' + myName;

        // this.emit(':tell', say );
        this.emit('sayIt', ':tell', say, 'try again');
    },
    'AMAZON.CancelIntent': function () {
        var say = '';
        var myName = '';
        if (this.attributes['myName'] ) {
            myName = this.attributes['myName'];
        }
        say = 'Goodbye, ' + myName;

        // this.emit(':tell', say );
        this.emit('sayIt', ':tell', say, 'try again');
    }
}
// end of handlers

// ---------------------------------------------------  User Defined Functions ---------------
