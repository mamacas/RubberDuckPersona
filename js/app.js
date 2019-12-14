'use strict';

// Global variables and document elements
let theQuestion = document.getElementById('theQuestion');
let theField = document.getElementById('theField');
let input0 = document.getElementById('input0');
// let radio0 = document.getElementById('radio0');
let output0 = document.getElementById('output0');
let input1 = document.getElementById('input1');
// let radio1 = document.getElementById('radio1');
let output1 = document.getElementById('output1');
let userObjects = [];
let quizObjects = [];
let x = 0;
let y = 0;
let quadrant = 0;
let currentQuestion = 0;

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

function lastResponse(quiz){ // This needs to be run when the last question is answered. You must feed it the name of the quiz. It can either go after 'newResponse()', or we can bake 'newResponse()' into this. Either path is pretty good at this point, I would lean toward baking in 'newResponse()' though.
  mapXY();
  quiz.newAttempt(quadrant);
}

function renderQuestion(){  // This function is used to render the contents of a question to the page. You need to feed it ...
  
}

// Build some sample questions and users
let color = new Quiz('color'); // Instantiate a new Quiz, 'color'
color.addQuestion('What is your favorite color?', 'Blue', 'x++', 'Red', 'x--'); // Add a question to 'color' Quiz
color.addQuestion('What is your second favorite color?', 'Green', 'y--', 'Yellow', 'y++');

function renderQuestion() {
  theQuestion.innerText = color.questions[currentQuestion][0];
  output0.innerText = color.questions[currentQuestion][1];
  output1.innerText = color.questions[currentQuestion][3];
  input0.addEventListener('click', function(event){
    // radio0.checked = 'true';
    // radio0.checked = 'false';
    ++currentQuestion;
    renderQuestion();
  });
  input1.addEventListener('click', function(event){
    // radio1.checked = 'true';
    ++currentQuestion;
    renderQuestion();
    // radio1.checked = 'false';
  });
}
renderQuestion();

color.addResult('blueSkittle', 'It is a blue skittle', 'noSource', 'fakeAlt', 'fakeTitle'); // Add a result to 'color' Quiz, 1/4 or index 0 of 'color'
color.addResult('redM&M', 'It is a red M&M', 'noSource', 'fakeAlt', 'fakeTitle'); // Add a result to 'color' Quiz, 2/4 or index 1 of 'color'
color.addResult('greenSourPatch', 'It is a green sour patch', 'none', 'fake', 'fake'); // Add a result to 'color' Quiz, 3/4 or index 2 of 'color'
color.addResult('yellowHaribo', 'It is a yellow haribo', 'none', 'fake', 'fake'); // Add a result to 'color' Quiz, 4/4 or index 3 of 'color'
// The following two lines need to happen as results of events. We need to build our code to do this.
newResponse('y--'); // Mocking a response
lastResponse(color); // Mock the lastResponse function, as if we've responded to all questions
console.log(color.results); // Console log the color.results array so we can see that we've got a result logged

// color.newAttempt('1');
