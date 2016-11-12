
## Alexa Cookbook - Recipes and Ingredients

### Welcome!
These projects are individual tutorials that show you the simplest way to add a new features to your Alexa skill.
Let's assume we are a chef, with an idea for a fancy new recipe.  The recipe will require one or more ingredients to be combined to create the finished product.
Alexa skills follow the same model.  Basic ingredients can be added together to create a robust skill.

##### Before starting
The lessons assume you have built a skill with the [Alexa Skills Kit](https://developer.amazon.com/ask) .

If you are new to Alexa, first complete the [Decision Tree](https://bit.ly/alexadecisionvid) tutorial.

* Recommend having [Node.JS](https://nodejs.org/en/) available on your command prompt and become familiar with [NPM](https://www.npmjs.com), the Node Package Manager
* Recommend having [GIT](http://www.git.com) available on your command prompt
* Review the [alexa-sdk](https://www.npmjs.com/package/alexa-sdk) documentation

##### Ready to get cooking?

Choose a recipe below and follow the tutorial steps to create and enhance a new skill.

*  #### Recipe 1 [State Pop](StatePop)
   We start with a basic skill that plays a welcome message, responds to Help and Stop; and listens for you to say the name of a US State
   We will then add a feature to let you tell the skill your name, which is stored and repeated when you end your conversation.
   Finally, we will add helper functions to look up and report on the Population of each state, using data from a file or from a REST API call.

*  #### Recipe 2 [Coming Soon](Coming Soon)
   Basic skill with Launch, Help, Stop handlers;
   Add code to have skill write to SQS queue
   Deploy Single Page Webapp that connects to AWSd
   Add browser code to long poll SQS and update page
