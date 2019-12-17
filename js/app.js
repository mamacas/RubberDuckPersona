'use strict';

// Global variables and document elements
let welcomeMessage = document.getElementById('welcome-instruct');
let nameField = document.getElementById('username-entry');
let nameEntry = document.getElementById('nameEntry');
let questionBox = document.getElementById('question-box');
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

// Show/Hide Functions
function show(elem) {
  elem.style.display = 'block';
}

function hide(elem){
  elem.style.display = 'none';
}

// Build some sample questions and users
// Figure out why first question written is second question to populate?
let duckquiz = new Quiz('duckquiz'); // Instantiate a new Quiz, 'duckquiz'
duckquiz.addQuestion('Friends invite you out to party, but your team has an assignment due tonight and you need to contribute. Do you...?', 'Quickly craft an MVP response and you’re off to Paaaaarr-TEHHHH!!', 'x++', 'Forego the fleeting distraction and apply yourself to the task at hand, for the sake of those depending upon you.', 'x--'); // Add a question to 'duckquiz' Quiz
duckquiz.addQuestion('You’ve been tasked with creating a dynamic, interactive app! Any app you want! Your mind is an array of ideas, and you can’t wait to access them all! Which bit of coding are you most looking forward to?', 'JavaScript. Logic is my thing. I excel at creating the moving parts and making sure they work together harmoniously. ', 'y++', 'HTML/CSS. I love creating shiny, beautiful interfaces for the world to enjoy.', 'y--');
duckquiz.addQuestion('You are fortunate enough to enjoy one whole day off of school/work each week. The past six days have been especially silly, and you can’t wait to be off duty. What are you doing?', 'I’m inside! There’s nothing like the comfort of my home after a long week.', 'x++', 'I’m outside! I’m energized by the bustle of the world and like to get out whenever I can.', 'y++');
duckquiz.addQuestion('You’re about to drift off to sleep when suddenly you hear *crash!* a noise from the other room. How are you going to respond?', 'Bounce out of bed, grab whatever’s closest, and creep around, looking for the source of this terrible interruption to your good night’s sleep.', 'x--', 'You roll over and replay in your mind the day’s events, searching for a rational explanation, surely no one is out to get you… right?', 'y++');
duckquiz.addQuestion('You fell asleep watching a movie you really enjoy. You find yourself in a dream, and you\'re in the most exciting part of the story. What\'s going on in this scene?', 'Recognition for your inspirational efforts are finally happening, you\'ve started a social movement.', 'y--', 'placeholder answer', 'x--');

// RESULT PLACEHOLDERS
duckquiz.addResult('blueSkittle', 'It is a blue skittle', 'noSource', 'fakeAlt', 'fakeTitle'); // Add a result to 'duckquiz' Quiz, 1/4 or index 0 of 'duckquiz'
duckquiz.addResult('redM&M', 'It is a red M&M', 'noSource', 'fakeAlt', 'fakeTitle'); // Add a result to 'duckquiz' Quiz, 2/4 or index 1 of 'duckquiz'
duckquiz.addResult('greenSourPatch', 'It is a green sour patch', 'none', 'fake', 'fake'); // Add a result to 'duckquiz' Quiz, 3/4 or index 2 of 'duckquiz'
duckquiz.addResult('yellowHaribo', 'It is a yellow haribo', 'none', 'fake', 'fake'); // Add a result to 'duckquiz' Quiz, 4/4 or index 3 of 'duckquiz'

let currentQuiz = duckquiz;
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

new User('bob');
// When username is entered...
nameField.addEventListener('submit', handleSubmit);


// Do things with it
function handleSubmit(event) {
  event.preventDefault();

  let newUsername = event.target.inputNameValue.value;
  new User(newUsername);

  hide(welcomeMessage);
  hide(nameField);
  show(questionBox);
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
hide(questionBox);
