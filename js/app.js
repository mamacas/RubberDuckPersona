'use strict';

// Global variables and document elements
let userObjects = [];
let quizObjects = [];
let historyObjects = [];

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
  this.results.push([question, responseA, weightA, responseB, weightB]);
};

Quiz.prototype.newResult = function(resultTitle, resultBio, imagePath, imageAtl, imageTitle){
  let resultCounter = 0;
  this.questions.push([resultTitle, resultCounter, resultBio, imagePath, imageAtl, imageTitle]);
};

Quiz.prototype.newAttempt = function(resultToIncrement){
  ++this.quizCounter;
  this.results.forEach(function(n)){
    if(n[0] === resultToIncrement){
      ++n[1];
    }
  }
};

// History.prototype.newResult = function(result){
//   this.cummulative++;
//   if ()
// }

// Helper functions


