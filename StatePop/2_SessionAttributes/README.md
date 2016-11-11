
## SessionAttributes

Alexa can remember key pieces of information during the flow of a conversation by making use of `session.attributes`.


#### Steps:
1. Open your skill's Interaction Model and replace the Intent Schema and Sample Utterances with the [speechAssets](speechAssets) folder contents.
2. Review the new code in [index.js](src/index.js), right click Select-All and Copy the code to your clipboard.
3. From the AWS console, click on your Lambda function and select all of your source code, and paste in the new code from step 2.


#### Test:
 Test your skill.
  1. Launch the skill by saying "open state pop"
  2. Say "my name is Robert"
  3. Say "stop"

Another test:
  1. Launch the skill by saying "open state pop"
  2. Say the name of a U.S. State
  3. Repeat
  4. Say "recap"
  5. Say "stop"


#### Learn:

The skill's adds a `MyNameIsIntent` and uses the built-in slot type `AMAZON.US_STATE`.
```
      "intent": "MyNameIsIntent",
      "slots":[
        {
          "name":"myName",
          "type":"AMAZON.US_FIRST_NAME"
        }
      ]
```
The handler for this will store the myName slot value to session.attributes for use later in the conversation.

```javascript
    'MyNameIsIntent': function() {

        var myName = this.event.request.intent.slots.myName.value;

        // create and store session attributes
        this.attributes['myName'] = myName;

        var say = 'Hi ' + myName;

        this.emit(':ask', say, 'try again');
    },
```

The skill also adds code to the `StateRequestIntent` to store each US State into an Array.
```javascript
    'StateRequestIntent': function() {
        var myState = this.event.request.intent.slots.usstate.value;

        // create and store session attributes
        if (!this.attributes['myList']) {
            this.attributes['myList'] = [];  // empty array
        }

        this.attributes['myList'].push(myState);  // add array element

        var say = 'You asked for ' + myState;

        this.emit(':ask', say, 'try again');
    },
```

Finally, the skill adds a RecapIntent that will recite the list of elements currently in the Array.
```javascript

```


##### Next [3_DataAccess](../3_DataAccess)

