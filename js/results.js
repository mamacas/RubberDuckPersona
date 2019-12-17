'use strict';

function popResults(){
    var dataLS = localStorage.getItem('userResults');

    if (dataLS) {
        var parsedUserResults = JSON.parse(dataLS);
        
        console.log('old last three attempts: ', parsedUserResults);

        // for (var i = 0; i < parsedUserResults.length; i++) {

        // }

        console.log('new lastThreeAttempts: ', parsedUserResults);
    }
    return parsedUserResults;
}

popResults();
