'use strict';

// Global variables and document elements
let userObjects = [];
let quizObjects = [];
let historyObjects = [];
let x = 0;
let y = 0;

// Constructor functions
function User(userName){
  this.username = userName,
  this.attempts = [],
  userObjects.push(this);
}

function Quiz(title){
  this.title = title,
  this.quizCounter = 0,
  this.questions = [],
  this.results = [],
  quizObjects.push(this);
}

// function History(quiz){
//   this.quiz = quiz,
//   this.cummulative = 0,
//   this.resultCounter = [],
//   historyObjects.push(this);
// }

// Prototype functions

User.prototype.newAttempt = function(quiz, result){
  this.attempts.push([quiz, result]);
};

Quiz.prototype.addQuestion = function(question, responseA, weightA, responseB, weightB){
  this.questions.push([question, responseA, weightA, responseB, weightB]);
};

Quiz.prototype.addResult = function(resultTitle, resultBio, imagePath, imageAtl, imageTitle){
  let resultCounter = 0;
  this.results.push([resultTitle, resultCounter, resultBio, imagePath, imageAtl, imageTitle]);
};

Quiz.prototype.newAttempt = function(resultToIncrement){
  ++this.quizCounter;
  this.results.forEach(function(n){
    if(n[0] === resultToIncrement){
      ++n[1];
    }
  });
};

// History.prototype.newResult = function(result){
//   this.cummulative++;
//   if ()
// }

// Helper functions

// Build some sample questions and users
new Quiz('color');
quizObjects[0].addQuestion('What is your favorite color?', 'Blue', 'x++', 'Red', 'y++');
quizObjects[0].addResult('blueSkittle', 'It is a blue skittle', 'noSource', 'fakeAlt', 'fakeTitle');
quizObjects[0].addResult('redM&M', 'It is a red M&M', 'noSource', 'fakeAlt', 'fakeTitle');
quizObjects[0].newAttempt('blueSkittle');
