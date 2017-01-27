'use strict';

// App ID for the skill.
var APP_ID = undefined;

// Array containing ImposterSyndrome tips.
var TIPS = [
  'Do not take yourself so seriously. Usually you feel like a fraud when you think you are more important than you are. When you feel like a fraud it’s in relation to some perfection that never actually existed. Letting go of some of your excess self-importance will go a long way in helping you feel less like a fake.'
];

// Require the AlexaSkill prototype and helper functions.
var AlexaSkill = require('./AlexaSkill');

// ImposterSyndrome is a child of AlexaSkill via inheritance.
var ImposterSyndrome = function () {
  AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
ImposterSyndrome.prototype = Object.create(AlexaSkill.prototype);
ImposterSyndrome.prototype.constructor = Tip;

ImposterSyndrome.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  console.log('onSessionStarted requestId: ' + sessionStartedRequest.requestId + ', sessionId: ' + session.sessionId);
};

ImposterSyndrome.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  handleNewTipRequest(response);
};

ImposterSyndrome.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  console.log('onSessionEnded requestId: ' + sessionEndedRequest.requestId + ', sessionId: ' + session.sessionId);
};

ImposterSyndrome.prototype.intentHandlers = {
  'GetNewImposterSyndromeIntent': function (intent, session, response) {
    handleNewTipRequest(response);
  },

  'AMAZON.HelpIntent': function (intent, session, response) {
    response.ask('You can say tell me a resume tip, or, you can say exit... What can I help you with?", "What can I help you with?');
  },

  'AMAZON.StopIntent': function (intent, session, response) {
    var speechOutput = 'Goodbye';
    response.tell(speechOutput);
  },

  'AMAZON.CancelIntent': function (intent, session, response) {
    var speechOutput = 'Goodbye';
    response.tell(speechOutput);
  }
};

// Gets a random new imposter syndrome tip from the list and returns to the user.
function handleNewImposterSyndromeRequest(response) {

  // Get a random interview tip from the imposter syndrome tips list
  var imposterSyndromeIndex = Math.floor(Math.random() * TIPS.length);
  var randomImposterSyndrome = TIPS[imposterSyndromeIndex];

  // Create speech output
  var speechOutput = 'Here is your imposter syndrome tip: ' + randomImposterSyndrome;
  var cardTitle = 'Your Imposter Syndrome Tip';
  response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  // Create an instance of the ImposterSyndromeTips skill.
  var imposterSyndrome = new ImposterSyndrome();
  imposterSyndrome.execute(event, context);
};
