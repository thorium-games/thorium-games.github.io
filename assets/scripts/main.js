/* 
Red = Ded by Malav Mehta, Justin Lu and Thomas Cwintal submitted on Friday, June 14, 2019
to Mr. Benjamin Hudson as part of the ICS2O course.

This game was created for clients from Thomas Darcy McGee, and was created to explore the usage
and knowledge of JS Document Object Models, Loops, Logic (selection, string), CSS styling techniques,
including Classes, Ids, and root variables, and finally HTML knowledge used to script the website.

This is the main JavaScript file containing all functions used for the the entire HTML document.
*/

// defining all divs as variables
var splashDiv = document.getElementById("splash-block");
var aboutDiv = document.getElementById("about-block");
var gameDiv = document.getElementById("game-block");
var teamDiv = document.getElementById("team-block");
var contactDiv = document.getElementById("contact-block");

// scrolling divs into view when this function is called
function navigateToDiv(div) {
    div.scrollIntoView();
}

// keeping track of ip addresses to ban users with inappropriate names
// var ipAdress;

// $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
//     ipAddress = data.geobytesremoteip;
// });

// firebase credentials for the server
var firebaseConfig = {
    apiKey: "AIzaSyBgxqqy4BkOo_ZSZHamiHtxaIOuaHUemz4",
    authDomain: "thorium-games.firebaseapp.com",
    databaseURL: "https://thorium-games.firebaseio.com",
    projectId: "thorium-games",
    storageBucket: "thorium-games.appspot.com",
    messagingSenderId: "877408314624",
    appId: "1:877408314624:web:f6cee9b114752466"
};

// intializing firebase app and database
firebase.initializeApp(firebaseConfig);

// variables used for sign in and create account modals/functions
var username;
var userPassword;
var userCount;
var loggedIn = false;
var database = firebase.database();
var signInModal = document.getElementById("sign-in-modal");
var createAccountModal = document.getElementById("create-account-modal");
var newUserId = document.getElementById("new-user-id");
var userId = document.getElementById("user-id")
var newUserPassword = document.getElementById("new-user-pass");
var userInputPassword = document.getElementById("user-pass");
var nameInput = document.getElementById("user-name");
var signInButton = document.getElementById("sign-in-button");
var createAccountButton = document.getElementById("create-account-button");
var mainSignIn = document.getElementById("main-sign-in");

// creating a new user
function createUser(userId, name, password, currentLevel) {
    database.ref('players/' + userId).set({ // creating a databse reference point and updating its values
        username: name,
        password: password,
        level: currentLevel,
        deaths: 0,
        ratio: 0
            // ip: ipAdress
    });
    userCount++;
    updateUserCount(userCount);
    createAccountButton.innerHTML = "account created!";
}

// updating user count with new users
function updateUserCount(count) {
    database.ref('players/count').set(count);
}

// getting user count to keep track of the # of users
function getUserCount() {
    return database.ref('players/count').once('value').then(function(snapshot) {
        userCount = (snapshot.val() && snapshot.val());
    });
}

getUserCount();

// collecting user input for authentication
function getInputForSignIn() {
    username = userId.value;
    password = userInputPassword.value;
    if (username != "" && password != "" && username.length <= 12) { // validating input
        signIn(username, password);
    } else {
        alert("You may not leave any fields blank, and you user id must be less than or equal 12 characters in length");
    }
}

// collecting new user values from create account modal
function getInputForNewUser() {
    username = newUserId.value;
    password = newUserPassword.value;
    name = nameInput.value;
    if (username != "" && password != "" && name != "" && username.length <= 12 && name.length <= 12) { // validating input
        createUser(username, name, password, 0);
    } else {
        alert("You may not leave any fields blank, and you username/user id must be less than or equal 12 characters in length");
    }
}

// showing a modal and binding "enter" key as submit button
function showModal(modal) {
    modal.style.display = "inline-block";
    window.onkeypress = function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            console.log(modal);
            if (modal == signInModal) {
                getInputForSignIn();
            } else if (modal == createAccountModal) {
                getInputForNewUser();
            }
        }
    }
}


// closing a modal
function cancelModal(modal) {
    modal.style.display = "none";
}

// sign in function gets the password and authorizes the user
function signIn(userId) {
    getPassword(userId);
    signInButton.innerHTML = "<span><img src='assets/images/misc/loading.gif' height='15px'></span>"
    setTimeout(authPassword, 500);
}

// password is autorised by matching inputted password to database password
function authPassword() {
    if (password == userPassword) {
        loggedIn = true;
        mainSignIn.innerHTML = `welcome back ${name}!`;
        cancelModal(signInModal);
    } else {
        loggedIn = false;
        alert("Authorization failed. Invalid or incorrect username/password. Please try again.")
    }

    signInButton.innerHTML = "sign in &rarr;";
}

// get the user's information from the database
function getPassword(userId) {
    return database.ref('/players/' + userId).once('value').then(function(snapshot) { // accessing the user's databse entry
        userPassword = (snapshot.val() && snapshot.val().password); // getting the value of the user's password
        name = (snapshot.val() && snapshot.val().username); // getting the user's name
        username = userId; // getting the username//userid
        currentLevel = (snapshot.val() && snapshot.val().level); // getting the user's current level
        if (currentLevel > globalLevel) {
            globalLevel = currentLevel; // updating globallevel variable form games.js
        }
        currentDeaths = (snapshot.val() && snapshot.val().deaths); // getting user's current death count
    });
}

// get the leaderboard query from the database
function getLeaderboard() {
    return database.ref('players/').orderByChild('ratio').then(function(snapshot) {
        var leaderboard = (snapshot.val() && snapshot.val());
        console.log(leaderboard);
    })
}


// function used to update leaderboard
function updateLeaderboard() {
    const query = database.ref('/players/').orderByChild('ratio').limitToLast(5) // using a databse query to find top 5 users
    var count = 5; // the number of users to load
    query.once('value', function(snapshot) { // finding values for each user using the query
        snapshot.forEach(function(childSnapshot) { // for each "snapshot" value, the following lines are executed
            var childRatio = (childSnapshot.val() && childSnapshot.val().ratio) // the ratio is retrieved
            var childName = (childSnapshot.val() && childSnapshot.val().username); // the user name is retrieved
            document.getElementById(`posName${count}`).innerHTML = childName; // the name is updated on leaderboard
            document.getElementById(`ratio${count}`).innerHTML = childRatio; // the ratio is updated on leaderboard
            count--; // the count diminishes for the dom updating lines above
        });
    });
}

updateLeaderboard(); // leaderboard updated on page load

function saveProgress() {
    currentDeaths += deaths;
    deaths = 0;
    currentLevel = globalLevel - 1;

    // adding one death to ensure there are now NaN values in database
    if (currentDeaths == 0) {
        currentDeaths++;
    }

    // checking to make sure that the user has not cheated by adding to ratio through console, and resetting progress if so
    if ((Math.round(((currentLevel / (currentDeaths)) * 100)) / 100 > gameLevels.length) || ((Math.round((currentLevel / (currentDeaths)) * 100)) / 100 > currentLevel)) {
        resetProgress();
        return null;
    }
    // changing variables in the location of the users database entry (in JSON format)
    database.ref('players/' + username).set({
        username: name,
        password: password,
        level: currentLevel,
        deaths: currentDeaths,
        ratio: (Math.round((currentLevel / (currentDeaths)) * 100)) / 100
    })
    updateLeaderboard();
}

// resetting user progress on demand by resetting variables
function resetProgress() {
    currentDeaths = 0;
    currentLevel = 0;
    globalLevel = 1;
    deaths = 0;
    saveProgress();
}

// loading the game for users if they have logged in
function loadGame() {
    if (loggedIn) {
        document.getElementById("actual-game-div").style.display = "inline-block";
        navigateToDiv(document.getElementById("actual-game-div"));
        document.getElementById("game-warning").innerHTML = "scroll down &darr;"
        bgAudio.play();
    } else {
        document.getElementById("actual-game-div").style.display = "none";
        document.getElementById("game-warning").innerHTML = "sign in to play &nearr;"
    }
}

setInterval(saveProgress, 5000); // progress regularly saved every 5 seconds

// functions use to turn music on and off, and to change the attributes of the button toggling the music state

function musicOff() {
    bgAudio.pause();
    document.getElementById("music-switch").innerHTML = "music on";
    document.getElementById("music-switch").setAttribute("onclick", "musicOn()");
}

function musicOn() {
    bgAudio.play();
    document.getElementById("music-switch").innerHTML = "music off";
    document.getElementById("music-switch").setAttribute("onclick", "musicOff()");
}

// disabling all keyboard variables allowing access to console for database manipulation;
document.onkeydown = function(e) {
    if (event.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}