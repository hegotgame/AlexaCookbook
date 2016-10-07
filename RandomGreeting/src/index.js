
exports.handler = function( event, context ) {

    var say = "Hello World";

    var dataset = // array
        [
            "hey",
            "okay",
            "yo"
        ];

    var i = 0;

    i = Math.floor(Math.random() * dataset.length);

    say = dataset[i] + ", " + say;

    var response = {
        outputSpeech: {
            type: "SSML",
            ssml: "<speak>" + say + "</speak>"
        },
        shouldEndSession: true
    };


    context.succeed( { response: response } );

};




