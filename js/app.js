'use strict';

// Document Elements
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

// Globals
let userObjects = [];
let quizObjects = [];
let resultObjects = [];
let x = 0;
let y = 0;
let quadrant = 0;
let thisAttempt = [];
let newUsername = '';

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

  thisAttempt = this.results[resultToIncrement];
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
duckquiz.addQuestion('You are fortunate enough to enjoy one whole day off of school/work each week. The past six days have been especially silly, and you can’t wait to be off duty. What are you doing?', 'I’m inside! There’s nothing like the comfort of my home after a long week.', 'x++', 'I’m outside! I’m energized by the bustle of the world and like to get out whenever I can.', 'x--');
duckquiz.addQuestion('You’re about to drift off to sleep when suddenly you hear *crash!* a noise from the other room. How are you going to respond?', 'Bounce out of bed, grab whatever’s closest, and creep around, looking for the source of this terrible interruption to your good night’s sleep.', 'y--', 'You roll over and replay in your mind the day’s events, searching for a rational explanation, surely no one is out to get you… right?', 'y++');
duckquiz.addQuestion('You fell asleep watching a movie you really enjoy. You find yourself in a dream, and you\'re in the most exciting part of the story. What\'s going on in this scene?', 'Recognition for your inspirational efforts are finally happening, you\'ve started a social movement.', 'y--', 'Absolutely. Nothing. Finally a bit of peace.', 'y++');

// RESULT PLACEHOLDERS
// parameters: resultTitle, resultBio, imagePath, imageAtl, imageTitle
duckquiz.addResult('Friduc Kahlo', '“You were a duck that went about in a world of colors…” The archtypical Creative, you wouldn’t necessarily consider yourself an extravert, but rather someone who is “wisely assertive”. You express your own feelings and tell your own story through your creations rather than through conversations. But you are willing to speak for the voiceless, to represent the under-represented, and to put yourself out there regardless of the consequences. “Nothing is absolute. Everything changes, everything moves, everything revolves, everything flies and goes away, ...quacking.”', 'assets/frida-duck.jpg', 'Image of Rubber Duck likeness of artist Frida Kahlo', 'Friduc Kahlo'); // Add a result to 'duckquiz' Quiz, 1/4 or index 0 of 'duckquiz'
duckquiz.addResult('Chewducca', '“Quack, quaaack quaack. Quaack!” (followed by explosions). You don’t follow the action, you initiate it! You frequently find yourself on dangerous adventures with your best friend. You may not always be the hero, but you enjoy taking the credit for it regardless. Life just isn’t moving fast enough otherwise. Your friends and family mean the galaxy to you, and you’ll fight for them for as long as you can. Your favorite leisure activity is a nice game of dejarik, which you always win because nobody dares upset you.', 'assets/chewbacca-duck.jpg', 'Image of Rubber Duck likeness of Chewbacca', 'Chewducca'); // Add a result to 'duckquiz' Quiz, 2/4 or index 1 of 'duckquiz'
duckquiz.addResult('Sherduck Holmes', 'You have an insatiable curiosity, wide-ranging interests, and a keen analytical mind. However, you can be more focused on your own thoughts than on those around you, which means you sometimes come across as distant or aloof to the casual observer. Your closest associates know better, though, seeing behind the façade to the warm, engaging, and intensely loyal individual that the World never suspects is there.', 'assets/sherlock-duck.jpg', 'Image of Rubber Duck likeness of fictional detective Sherlock Holmes', 'Sherduck Holmes'); // Add a result to 'duckquiz' Quiz, 3/4 or index 2 of 'duckquiz'
duckquiz.addResult('Vibin\' Duck', 'You enjoy living in leisure, meandering along the path of least resistance. Some may say you’re too passive, but you prefer to think of yourself as a chameleon, adapting to whatever situation you find yourself in. You can’t really be bothered by the trials of life, and you know that whatever will be will be! Those closest to you love your down-for-whatever energy and appreciate your chill disposition. When people ask you what your hobbies are, you tell them you “like to have a good time.” You are really just vibin’.', 'assets/shades-duck.jpg', 'Image of Rubber Duck with sunglasses on', 'Vibin Duck'); // Add a result to 'duckquiz' Quiz, 4/4 or index 3 of 'duckquiz'

// Run a check to see if the localStorage quizObjects is newer than ours, and use it if it is (if it exists)
if(localStorage.quizObjects){
  let checkDocument = [JSON.stringify(quizObjects)];
  let checkStorage = [localStorage.getItem('quizObjects')];
  console.log(`checkDocument.length: ${checkDocument[0].length}\ncheckStorage.length: ${checkStorage[0].length}`)
  if(checkDocument[0].length === checkStorage[0].length || checkDocument[0].length <= checkStorage[0].length){
    quizObjects = JSON.parse(localStorage.getItem('quizObjects'))
  }
}

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
// create an object to store in localStorage
function storeInLS() {
  if(localStorage.resultObjects){
    resultObjects = JSON.parse(localStorage.getItem('resultObjects'));
  }

  // [title, bio, src]
  resultObjects.push(thisAttempt);

  localStorage.setItem('resultObjects', JSON.stringify(resultObjects))
}

function lastResponse(){ // This needs to be run when the last question is answered. You must feed it the name of the quiz. It will call mapXY, add a newAttempt to the quiz, and load the results.html page.
  mapXY();
  currentQuiz.newAttempt(quadrant);

  nameField.removeEventListener('submit', handleSubmit);

  thisAttempt.push(newUsername);
  console.log('thisAttempt: ', thisAttempt);

  storeInLS();
  localStorage.setItem('quizObjects', JSON.stringify(quizObjects))

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
  nameField.addEventListener('submit', handleSubmit);
  
  theQuestion.innerText = currentQuiz.questions[currentQuestion][0];
  output0.innerText = currentQuiz.questions[currentQuestion][1];
  output1.innerText = currentQuiz.questions[currentQuestion][3];
  if(currentQuestion === (currentQuiz.questions.length - 1)){
    optionEvents(input0, 2);
    optionEvents(input1, 4);
  }
}

// Do things with it
function handleSubmit(event) {
  event.preventDefault();
  
  newUsername = event.target.inputNameValue.value;
  new User(newUsername);
  
  hide(welcomeMessage);
  hide(nameField);
  show(questionBox);
}

// Call our main function
renderQuestion();
hide(questionBox);

new User('bob');