
var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){

    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers, newSessionHandlers, startModeHandlers);
    alexa.execute();

};
var states = {
    GUESSMODE: '_GUESSMODE', // User is trying to play a number
    STARTMODE: '_STARTMODE'  // Prompt the user to start or restart the game.
};

var newSessionHandlers = {

    // This will short-cut any incoming intent or launch requests and route them to this handler.
    'NewSession': function() {

        this.handler.state = states.STARTMODE;
        this.emit(':ask', 'Welcome to the Press Your Luck game. How many players are there?',
            'Say one, two, three or four players.');
    }
};

var startModeHandlers = Alexa.CreateStateHandler(states.STARTMODE, {
    'NumberIntent': function() {
            var myNumber = 1;
            if (this.event.request.intent.slots.myNumber) {
                myNumber = this.event.request.intent.slots.myNumber.value;
            }

            var say = 'Starting a game with ' + myNumber + " players.";
            this.emit(':ask', say, 'try again');
        }

    }
);

var handlers = {
    // 'LaunchRequest': function () {
    //     var say = 'Welcome!';
    //     this.emit(':ask', say, 'try again');
    // },

    'AMAZON.HelpIntent': function () {
        var say = "Say a number of players like one player or two players.";
        this.emit(':ask', say, 'try again');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
}
