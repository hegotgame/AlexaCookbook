var CallAPIs = require("../src/CallAPIs");

// getPopFromArray(myState, pop => {
// CallAPIs.getPopMock(myState, pop => {
// CallAPIs.getPopFromArray(myState, pop => {
console.log('begin');

// getPopFromArray(myState, pop => {
// CallAPIs.getPopMock(myState, pop => {
// CallAPIs.getPopFromArray(myState, pop => {
var newState = "Virginia";

// CallAPIs.getPopFromAPI_POST(myState, pop => {
//
//     say = 'The post population of ' + myState + ' is ' + pop;
//
//     console.log("say = " + say);
//
//
// });

CallAPIs.setIOTshadow(newState, pop => {
    say = 'The population of ' + newState + ' is ' + pop;

    console.log("say = " + say);
}

);

