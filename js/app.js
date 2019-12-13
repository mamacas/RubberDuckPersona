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

function lastResponse(quiz){
  mapXY();
  quiz.newAttempt(quadrant);
}

// Build some sample questions and users
let color = new Quiz('color');  // Instantiate a new Quiz, 'color'
color.addQuestion('What is your favorite color?', 'Blue', 'x++', 'Red', 'y++');  // Add a question to 'color' Quiz
color.addResult('blueSkittle', 'It is a blue skittle', 'noSource', 'fakeAlt', 'fakeTitle');  // Add a result to 'color' Quiz, 1/4 or index 0 of 'color'
color.addResult('redM&M', 'It is a red M&M', 'noSource', 'fakeAlt', 'fakeTitle');  // Add a result to 'color' Quiz, 2/4 or index 1 of 'color'
color.addResult('greenSourPatch', 'It is a green sour patch', 'none', 'fake', 'fake');  // Add a result to 'color' Quiz, 3/4 or index 2 of 'color'
color.addResult('yellowHaribo', 'It is a yellow haribo', 'none', 'fake', 'fake');  // Add a result to 'color' Quiz, 4/4 or index 3 of 'color'
newResponse(prompt('mock response value:'));  // Mocking a response
lastResponse(color);  // Mock the lastResponse function, as if we've responded to all questions
console.log(color.results); // Console log the color.results array so we can see that we've got a result logged

// color.newAttempt('1');
