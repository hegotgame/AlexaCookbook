var aws = require('aws-sdk');


// var Alexa = require('alexa-sdk');
//
var CallAPIs = require("./CallAPIs");
//

var config = {};
    config.CALL_FUNCTION            = "StatePop";
    config.IOT_BROKER_ENDPOINT      = "a2eshrcp6u0y0c.iot.us-east-1.amazonaws.com".toLowerCase();
    config.IOT_BROKER_REGION        = "us-east-1";
    config.IOT_THING_NAME           = "waterPump";


exports.handler = function( event, context ) {
    var lambda = new aws.Lambda({
        region: 'us-east-1' //change to your region
    });
    var myState = "";

    console.log("EEEEEVENT");
    console.log(event);


    if ("usstate" in event.request) {
        myState = event.request.intent.slots.usstate.value;

    } else {
        MyState = "Massachusetts";
    }


    CallAPIs.setShadow(event, event, config, function(status) {

        console.log("set shadow and status is " + status);

        // PROXY that invokes another function.
        lambda.invoke({
            FunctionName: config.CALL_FUNCTION,
            // InvocationType: 'Event',
            Payload:  JSON.stringify(event, null, 2)

        }, function(error, data) {
            if (error) {
                console.log('oh snap!', error, error.stack);
                context.done('error', error);

            }
            if(data){
                console.log('Success, received:  ' + JSON.stringify(data.Payload));
                context.succeed(JSON.parse(data.Payload));

            }
        });

    });
    // subscribe to topic  $aws/things/waterPump/shadow/update/accepted
    // CallAPIs.getPopFromArray(myState, pop => {





};

