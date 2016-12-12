
exports.handler = function( event, context ) {

    var say = "Hello World";

    var response = {
        outputSpeech: {
            type: "SSML",
            ssml: "<speak>" + say + "</speak>"
        },
        shouldEndSession: true
    };


    context.succeed( { response: response } );

};



