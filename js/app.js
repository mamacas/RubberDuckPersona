'use strict';

// Global variables and document elements
let theQuestion = document.getElementById('theQuestion');
let theField = document.getElementById('theField');
let input0 = document.getElementById('input0');
let output0 = document.getElementById('output0');
let input1 = document.getElementById('input1');
let output1 = document.getElementById('output1');
let userObjects = [];
let quizObjects = [];
let x = 0;
let y = 0;
let quadrant = 0;

// Constructor functions
function User(userName){ // This is the constructor function for our User objects. This has not yet been developed very far. More to come.
  this.username = userName,
  this.attempts = [],
  userObjects.push(this);
}

function Quiz(title){ // This is the constructor function for our Quiz objects. All objects will be pushed to an array, but we can also instantiate them as an object themselves. Something great is that the named object and the object in the array are the SAME object. What happens to one, happens to the other. This will be important when we utilize local storage. We can avoid referencing the object through the array, which makes the code more readable. And even though we'll instantiate the objects every time we load, we'll overwrite the object with what's in local storage.
  this.title = title,
  this.quizCounter = 0,
  this.questions = [],
  this.results = [],
  quizObjects.push(this);
}

// Prototype functions
User.prototype.newAttempt = function(quiz, result){ // A method of User to add the result of a newly completed quiz to the user object.
  this.attempts.push([quiz, result]);
};

Quiz.prototype.addQuestion = function(question, responseA, weightA, responseB, weightB){ // A method of Quiz to build the questions a quiz object contains. For now, only requires a question content, and the content and weight of two questions.
  this.questions.push([question, responseA, weightA, responseB, weightB]);
};

Quiz.prototype.addResult = function(resultTitle, resultBio, imagePath, imageAtl, imageTitle){ // A method of Quiz to build the results of a quiz object. Our quizzes need four (4) results to work properly. Maybe I'll build in a feature to throw an error if any Quiz objects don't contain four results.
  let resultCounter = 0;
  this.results.push([resultTitle, resultCounter, resultBio, imagePath, imageAtl, imageTitle]);
};

Quiz.prototype.newAttempt = function(resultToIncrement){ // A method of Quiz to handle a new completed attempt. It will increment a counter of total quiz attempts completed, and a counter of total times a specific result has been obtained. You need to feed it which result as an argument, this will be in the form of an index value from 0 - 3.
  ++this.quizCounter;
  if(this.results[resultToIncrement]){
    ++this.results[resultToIncrement][1];
  } else{
    alert('You maybe did not call your Quiz newAttempt prototype function correctly? Go debug bruh!');
  }
};

// 
// Build some sample questions and users
let color = new Quiz('color'); // Instantiate a new Quiz, 'color'
color.addQuestion('What is your favorite color?', 'Blue', 'x++', 'Red', 'x--'); // Add a question to 'color' Quiz
color.addQuestion('What is your second favorite color?', 'Green', 'y++', 'Yellow', 'y--');
color.addResult('blueSkittle', 'It is a blue skittle', 'noSource', 'fakeAlt', 'fakeTitle'); // Add a result to 'color' Quiz, 1/4 or index 0 of 'color'
color.addResult('redM&M', 'It is a red M&M', 'noSource', 'fakeAlt', 'fakeTitle'); // Add a result to 'color' Quiz, 2/4 or index 1 of 'color'
color.addResult('greenSourPatch', 'It is a green sour patch', 'none', 'fake', 'fake'); // Add a result to 'color' Quiz, 3/4 or index 2 of 'color'
color.addResult('yellowHaribo', 'It is a yellow haribo', 'none', 'fake', 'fake'); // Add a result to 'color' Quiz, 4/4 or index 3 of 'color'

let currentQuiz = color;
let currentQuestion = (currentQuiz.questions.length - 1);

// Helper functions
function mapXY(){ // This function takes in our x and y values, and converts them into an index value (0-3), that I call 'quadrant' because we use a graph to visualize the relation between x/y and the results.
  if(x >= 0 && y >= 0){quadrant = 0;
  } else if(x < 0 && y >= 0){quadrant = 1;
  } else if(x < 0 && y < 0){quadrant = 2;
  } else if(x >= 0 && y < 0){quadrant = 3;
  } else{alert('Your \'mapXY\' came up with a \'quadrant\' variable that is invalid. Go debug, bruh!');
  }
  console.log(`xy mapped to quadrant ${quadrant}`);
}

function newResponse(weight){ // This is a function to call in the event handler for selecting a response. It will increment or decrement a given value based on the option's weight.
  if(weight === 'x++'){++x;
  } else if(weight === 'x--'){--x;
  } else if(weight === 'y++'){++y;
  } else if(weight === 'y--'){--y;
  } else{alert('Your \'newResponse\' function resulted in a failure.\nIt\'s likely that you didn\'t pass a valid argument somewhere.\nGo debug, bruh!');
  }
}

function lastResponse(){ // This needs to be run when the last question is answered. You must feed it the name of the quiz. It will call mapXY, add a newAttempt to the quiz, and load the results.html page.
  mapXY();
  currentQuiz.newAttempt(quadrant);
  window.location.href = 'results.html';
}

function optionEvents(element, option){ // This function contains an event listener we use for the options. It will call newResponse according to option, move currentQuestion to the next value, and depending if there are remaining questions, call either renderQuestion (for the next question now), or call lastResponse.
  element.addEventListener('click', function(event){
    newResponse(currentQuiz.questions[currentQuestion][option]);
      if(currentQuestion > 0){
        --currentQuestion;
        renderQuestion();
      } else{
        lastResponse();
        --currentQuestion;
      }
  });
}

function renderQuestion() { // This function renders our main feature to the page with its content, and adds event listeners to the options (only when the first question is loaded).
  theQuestion.innerText = currentQuiz.questions[currentQuestion][0];
  output0.innerText = currentQuiz.questions[currentQuestion][1];
  output1.innerText = currentQuiz.questions[currentQuestion][3];
  if(currentQuestion === (currentQuiz.questions.length - 1)){
    optionEvents(input0, 2);
    optionEvents(input1, 4);
  }
}

// Call our main function
renderQuestion();
