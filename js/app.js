'use strict';

// Global variables and document elements
let userObjects = [];
let quizObjects = [];
let x = 0;
let y = 0;
let quadrant = 0;

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
  if(this.results[resultToIncrement]){
    ++this.results[resultToIncrement][1];
  } else{
    alert('You maybe did not call your Quiz newAttempt prototype function correctly? Go debug bruh!');
  }
};

// Helper functions
function mapXY(){
  if(x >= 0 && y >= 0){
    quadrant = 0;
  } else if(x < 0 && y >= 0){
    quadrant = 1;
  } else if(x < 0 && y < 0){
    quadrant = 2;
  } else if(x >= 0 && y < 0){
    quadrant = 3;
  } else{
    alert('Your \'mapXY\' came up with a \'quadrant\' variable that is invalid. Go debug, bruh!');
  }
  console.log(`xy mapped to quadrant ${quadrant}`);
}

function newResponse(weight){
  if(weight === 'x++'){
    ++x;
  } else if(weight === 'x--'){
    --x;
  } else if(weight === 'y++'){
    ++y;
  } else if(weight === 'y--'){
    --y;
  } else{
    alert('Your \'newResponse\' function resulted in a failure.\nIt\'s likely that you didn\'t pass a valid argument somewhere.\nGo debug, bruh!');
  }
}

function lastResponse(){
  mapXY();
  quizObjects[quizObjects.length - 1].newAttempt(quadrant);
}

// Build some sample questions and users
new Quiz('color');
quizObjects[0].addQuestion('What is your favorite color?', 'Blue', 'x++', 'Red', 'y++');
quizObjects[0].addResult('blueSkittle', 'It is a blue skittle', 'noSource', 'fakeAlt', 'fakeTitle');
quizObjects[0].addResult('redM&M', 'It is a red M&M', 'noSource', 'fakeAlt', 'fakeTitle');
quizObjects[0].addResult('greenSourPatch', 'It is a green sour patch', 'none', 'fake', 'fake');
quizObjects[0].addResult('yellowHaribo', 'It is a yellow haribo', 'none', 'fake', 'fake');
// quizObjects[0].newAttempt('1');
