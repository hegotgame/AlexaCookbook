
## DataAccess  
Alexa skills can find answers to questions by performing lookups to external data sources.
 We will add a feature to our skill to get the population of each state.
We can find the answer to this question in one of two different ways; either  by referring to a secondary data file in our skill code project,
or by calling across the Internet to a public REST API.

#### 1. Data Access via included data file
##### Steps:

1. Notice a new folder and file under the `src` folder:  `/src/datafiles/dataset.js`
2. Navigate into the /src folder, select all files and folders and right click to compress into a new Zip archive.
3. Within your AWS Lambda function, upload this Zip archive to the function and click "Save".

##### Test:

  1. Launch the skill by saying "open state pop"
  2. Say the name of a U.S. State. Alexa responds with the population of the state.
  3. Repeat
  4. Say "stop"


##### Learn:
The skill code includes new functions, listed below the main function and handler functions.

`getPopFromArray` makes reference to an external file, opens the file, and loops through results.

This function is called from the StateRequestIntent handler.

```javascript
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

```

#### 2. Data Access via API Call
##### Steps:
  1. Within the AWS Lambda console, open your function code and find the StateRequestIntent handler
  2. On about line 33, notice the call to `getPopFromArray`.  Comment out this line, and enable the following line: `getPopFromAPI`
  ```javascript
       // getPopFromArray(myState, function(pop) {
       getPopFromAPI(myState, function(pop) {

       }
```

Test your function.  It is now making a network call to an external REST API, as defined in the `getPopFromAPI` function:

```javascript
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
```
You have completed the State Pop recipe tutorial.  Congratulations!

