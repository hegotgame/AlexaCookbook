// This code sample shows how to get data from an AWS S3 object within your skill Lambda code.

var AWS = require('aws-sdk');


exports.handler = function( event, context ) {
    var say = "";
    var shouldEndSession = false;
    var sessionAttributes = {};
    var myState = "";
    var pop = 0;
    var rank = 0;


    if (event.session.attributes) {
        sessionAttributes = event.session.attributes;
    }

    if (event.request.type === "LaunchRequest") {
        say = "Welcome to State Pop!  Say the name of a U.S. State.";
        context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

    } else {
        var IntentName = event.request.intent.name;

        if (IntentName === "StateRequestIntent") {

            if (event.request.intent.slots.usstate.value) {

                myState = event.request.intent.slots.usstate.value;


                // call AWS S3
                var s3 = new AWS.S3();

                var params = {
                    Bucket: 'alexabucket7',
                    Key: 'dataset.csv'
                    // this S3 object is in flat file comma-separated value format.
                    // State,Population,Rank
                    // "California",39100000,1
                    // "Texas",27500000,2
                };

                s3.getObject(params, function(err, data) {
                    if(err) { console.log(err, err.stack); }
                    else {
                        // console.log(data.Body.toString());
                        var dataset = data.Body.toString();
                        var dataArray = dataset.split('\n');

                        for (var i = 1; i < dataArray.length; i++) {

                            var rowArray = dataArray[i].split(',');

                            if (rowArray[0].replace(/"/g,"") == myState) {

                                pop = rowArray[1];

                                say = "The population of " + myState + " is " + pop;

                                // add the state to a session.attributes array
                                if (!sessionAttributes.requestList) {
                                    sessionAttributes.requestList = [];
                                }
                                sessionAttributes.requestList.push(myState);

                                // This line concludes the lambda call.  Be sure this line runs within any asynchronous callbacks that return and use data.
                                context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });


                            }
                        }

                    }
                });



            }

        } else if (IntentName === "AMAZON.StopIntent" || IntentName === "AMAZON.CancelIntent") {
            say = "You asked for " + sessionAttributes.requestList.toString() + ". Thanks for playing!";
            shouldEndSession = true;
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });


        } else if (IntentName === "AMAZON.HelpIntent" ) {
            say = "Just say the name of a U.S. State, such as Massachusetts or California."
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

        }
    }
};

function buildSpeechletResponse(say, shouldEndSession) {
    return {
        outputSpeech: {
            type: "SSML",
            ssml: "<speak>" + say + "</speak>"
        },
        reprompt: {
            outputSpeech: {
                type: "SSML",
                ssml: "<speak>Please try again. " + say + "</speak>"
            }
        },
        card: {
            type: "Simple",
            title: "My Card Title",
            content: "My Card Content, displayed on the Alexa App or alexa.amazon.com"
        },
        shouldEndSession: shouldEndSession
    };
}
