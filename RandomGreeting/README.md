# AlexaCookbook - RandomGreeting recipe


### This recipe shows how to have Alexa say a random greeting before each response.


### Code
1. Create a new AWS Lambda function called RandomGreeting
2. Paste in the source code from [src/index.js](./src/index.js)

### Skill
1. Create a new Skill called RandomGreeting with invocation name "random greeting".
2. Use the [IntentSchema.json](./speechAssets/IntentSchema.json) and [SampleUtterances.txt](speechAssets/SampleUtterances.txt) to configure your skill interaction model.


### Test
* Say "open random greeting" and Alexa should reply with either "hey, hello world", "okay", hello world", or "yo, hello world"

### Learn
* This recipe adds a static array of greeting words, and randomly selects one element, which is added just before the regular response text.

```javascript
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

```
