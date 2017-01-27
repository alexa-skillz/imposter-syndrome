'use strict';

var expect = require('chai').expect;
var index = require('../src/index');
const context = require('aws-lambda-mock-context');
const ctx = context();

describe('Testing a session with the AboutIntent', function() {
  var speechResponse = null;
  var speechError = null;
  before(function(done){
    index.handler({
      'session': {
        'sessionId': 'SessionId.cb5a3930-aceb-4477-a09d-43f8e70f61d4',
        'application': {
          'applicationId': 'amzn1.ask.skill.c73ff08c-0e32-4017-9ee6-ca4a62903096'
        },
        'attributes': {},
        'user': {
          'userId': 'amzn1.ask.account.AGGSFFF2FP56CF4ASL7F4PDAGZTQY2KJPYCBSO3DGY55XXZ37JC55IY2GAIK46GDHYZI3OAEHFXZP6B4JKV7IFHX3VRSR6VY4VMVYN2PWCPTNZOPFZLQJ5JIVICW74XWA44Q6MSRFCGVGSI2TBVKJ5NMSMACEHXK7FADJSCIVJV4PN7ET4EYG6VRWL6ZQC3LMOYCE2W6T3EBRIA'
        },
        'new': true
      },
      'request': {
        'type': 'IntentRequest',
        'requestId': 'EdwRequestId.53c2c56c-d3f8-4dd5-8877-e1905e897005',
        'locale': 'en-US',
        'timestamp': '2017-01-27T01:37:16Z',
        'intent': {
          'name': 'GetNewImposterSyndromeIntent',
          'slots': {}
        }
      },
      'version': '1.0'
    }, ctx);
    ctx.Promise
    .then(resp => { speechResponse = resp; done(); })
    .catch(err => { speechError = err; done(); });
  });
  describe('The response is structurally correct for Alexa Speech Services', function() {
    it('should not have errored',function() {
      expect(speechError).to.be.null;
    });
    it('should have a version', function() {
      expect(speechResponse.version).not.to.be.null;
    });
    it('should have a speechlet response', function() {
      expect(speechResponse.response).not.to.be.null;
    });
    it('should have a spoken response', () => {
      expect(speechResponse.response.outputSpeech).not.to.be.null;
    });
    it('should end the alexa session', function() {
      expect(speechResponse.response.shouldEndSession).not.to.be.null;
      expect(speechResponse.response.shouldEndSession).to.be.true;
    });
  });
});
