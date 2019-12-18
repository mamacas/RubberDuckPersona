'use strict';

var newResultBox = document.getElementById('new-result-box');
var newResultHeader = document.getElementById('new-result-header');
var newResultImg = document.getElementById('new-result-img');
var newResultBio = document.getElementById('new-result-bio');

var secondResultBox = document.getElementById('second-result-box');
var secondResultHeader = document.getElementById('second-result-header');
var secondResultImg = document.getElementById('second-result-img');
var secondResultBio = document.getElementById('second-result-bio');

var oldResultBox = document.getElementById('third-result-box');
var oldResultHeader = document.getElementById('third-result-header');
var oldResultImg = document.getElementById('third-result-img');
var oldResultBio = document.getElementById('third-result-bio');

const sampleResult = ["Chewducca",1,"You don't follow the action, you initiate it! You frequently find yourself on dangerous adventures with your best friend. You may not always be the hero, but you enjoy taking the credit for it regardless. Life just isn't moving fast enough otherwise. Your friends and family mean the galaxy to you, and you'll fight for them for as long as you can. Your favorite leisure activity is a nice game of dejarik, which you always win because nobody dares upset you.","assets/chewbacca-duck.jpg","Image of Rubber Duck likeness of Chewbacca","Chewducca","Robert"];

let resultObjects = [];
let quizObjects = [];
let userObjects = [];

// populate result titles, images, and bios on results.html

var renderResults = function(){
  newResultHeader.innerText = resultObjects[2][0];
  newResultImg.src = resultObjects[2][3];
  newResultBio.innerText = resultObjects[2][2];

  secondResultHeader.innerText = resultObjects[1][0];
  secondResultImg.src = resultObjects[1][3];
  secondResultBio.innerText = resultObjects[1][2];

  oldResultHeader.innerText = resultObjects[0][0];
  oldResultImg.src = resultObjects[0][3];
  oldResultBio.innerText = resultObjects[0][2];
};

function getObjects(){
  if(localStorage.resultObjects){
    resultObjects = JSON.parse(localStorage.getItem('resultObjects'));
  }
  while(resultObjects.length < 3){
    resultObjects.unshift(sampleResult);
  }
  while(resultObjects.length > 3){
    resultObjects.shift();
  }

  if(localStorage.quizObjects){
    quizObjects = JSON.parse(localStorage.getItem('quizObjects'));
  }

  if(localStorage.userObjects){
    quizObjects = JSON.parse(localStorage.getItem('userObjects'));
  }
}

getObjects();
renderResults();
