var AWS = require('aws-sdk');

// console.log("test begin");


var myState = "Illinois";

var s3 = new AWS.S3();

var params = {
    Bucket: 'alexabucket7',
    Key: 'dataset.csv'
};

s3.getObject(params, function(err, data) {
    if(err) { console.log(err, err.stack); }
    else {
        // console.log(data.Body.toString());
        var dataset = data.Body.toString();
        var dataArray = dataset.split('\n');

        for (var i = 1; i < dataArray.length; i++) {

            var rowArray = dataArray[i].split(',');

            //console.log(rowArray[0]);
            // myState = rowArray[0].replace(/"/g,"");

            if (rowArray[0].replace(/"/g,"") == myState) {

                console.log(myState);
                console.log(rowArray[1]);

            }
        }


    }
});
