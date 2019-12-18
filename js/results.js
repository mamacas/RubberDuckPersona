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

// populate result titles, images, and bios on results.html

var oldResult= {
  title: '',
  imgpath: '',
  bio: ''
};

var secondResult = {
  title: '',
  imgpath: '',
  bio: ''
};

var newResult = {
  title: '',
  imgpath: '',
  bio: ''
};

var threeResults = [oldResult, secondResult, newResult];

// var newResultBox = document.getElementById('');

var newestResult = function(){

  newResultHeader.innerText = newResult.title;
  newResultImg.innerHTML = newResult.imgpath;
  newResultBio.innerText = newResult.bio;
};

var resultTwoAndThree = function() {
  secondResultHeader.innerText = secondResult.title;
  secondResultImg.innerHTML = secondResult.imgpath;
  secondResultBio.innerText = secondResult.bio;

  oldResultHeader.innerText = oldResult.title;
  oldResultImg.innerHTML = oldResult.imgpath;
  oldResultBio.innerText = oldResult.bio;
};


function popResults(){
  var dataLS = localStorage.getItem('userResults');
  newestResult();
  resultTwoAndThree();
  console.log('new result: ', newResult);
  console.log('results two and three ', oldResult, secondResult);
  if (dataLS) {
    let parsedUserResults = [];
    parsedUserResults = JSON.parse(dataLS);
    
    console.log('old last three attempts: ', parsedUserResults);
    
    // for (var i = 0; i < parsedUserResults.length; i++) {
    //   parsedUserResults[i]++;
    // }
    
    // console.log('new lastThreeAttempts: ', parsedUserResults);
    // return parsedUserResults;
  } else {
    console.log('nothing in lS');
  }
  
  // firstResult.title = parsedUserResults[parsedUserResults.length - 1].title;
  // firstResult.imgpath = parsedUserResults[parsedUserResults.length = 1].imgpath;
  // firstResult.description = parsedUserResults[parsedUserResults.length = 1].bio;

}

popResults();



