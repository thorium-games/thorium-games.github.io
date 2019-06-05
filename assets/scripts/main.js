var splashDiv = document.getElementById("splash-block");
var aboutDiv = document.getElementById("about-block");
var gameDiv = document.getElementById("game-block");
var teamDiv = document.getElementById("team-block");
var contactDiv = document.getElementById("contact-block");

function navigateToDiv(div) {
    div.scrollIntoView();
}

var firebaseConfig = {
    apiKey: "AIzaSyBgxqqy4BkOo_ZSZHamiHtxaIOuaHUemz4",
    authDomain: "thorium-games.firebaseapp.com",
    databaseURL: "https://thorium-games.firebaseio.com",
    projectId: "thorium-games",
    storageBucket: "thorium-games.appspot.com",
    messagingSenderId: "877408314624",
    appId: "1:877408314624:web:f6cee9b114752466"
};

firebase.initializeApp(firebaseConfig);

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

function createUser(userId, name, password, currentLevel) {
    database.ref('players/' + userId).set({
        username: name,
        password: password,
        level: currentLevel,
        deaths: 0,
        ratio: 0
    });
    userCount++;
    updateUserCount(userCount);
    createAccountButton.innerHTML = "account created!";
}

function updateUserCount(count) {
    database.ref('players/count').set(count);
}

function getUserCount() {
    return database.ref('players/count').once('value').then(function(snapshot) {
        userCount = (snapshot.val() && snapshot.val());
    });
}

getUserCount();

function getInputForSignIn() {
    username = userId.value;
    password = userInputPassword.value;
    if (username != "" && password != "" && username.length <= 12) {
        signIn(username, password);
    } else {
        alert("You may not leave any fields blank, and you user id must be less than or equal 12 characters in length");
    }
}

function getInputForNewUser() {
    username = newUserId.value;
    password = newUserPassword.value;
    name = nameInput.value;
    if (username != "" && password != "" && name != "" && username.length <= 12 && name.length <= 12) {
        createUser(username, name, password, 0);
    } else {
        alert("You may not leave any fields blank, and you username/user id must be less than or equal 12 characters in length");
    }
}

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

function cancelModal(modal) {
    modal.style.display = "none";
}

function signIn(userId) {
    getPassword(userId);
    signInButton.innerHTML = "<span><img src='assets/images/misc/loading.gif' height='15px'></span>"
    setTimeout(authPassword, 500);
}

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

function getPassword(userId) {
    return database.ref('/players/' + userId).once('value').then(function(snapshot) {
        userPassword = (snapshot.val() && snapshot.val().password);
        name = (snapshot.val() && snapshot.val().username);
        username = userId;
        currentLevel = (snapshot.val() && snapshot.val().level);
        if (currentLevel > globalLevel) {
            globalLevel = currentLevel;
        }
        currentDeaths = (snapshot.val() && snapshot.val().deaths);
    });
}

function getLeaderboard() {
    return database.ref('players/').orderByChild('ratio').then(function(snapshot) {
        var leaderboard = (snapshot.val() && snapshot.val());
        console.log(leaderboard);
    })
}

function updateLeaderboard() {
    const query = database.ref('/players/').orderByChild('ratio').limitToLast(5)
    var count = 5;
    query.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childRatio = (childSnapshot.val() && childSnapshot.val().ratio)
            var childName = (childSnapshot.val() && childSnapshot.val().username);
            document.getElementById(`posName${count}`).innerHTML = childName;
            document.getElementById(`ratio${count}`).innerHTML = childRatio;
            count--;
        });
    });
}

updateLeaderboard();

function saveProgress() {
    currentDeaths += deaths;
    deaths = 0;
    currentLevel = globalLevel - 1;
    if (currentDeaths == 0) {
        currentDeaths++;
    }
    if ((Math.round(((currentLevel / (currentDeaths)) * 100)) / 100 > gameLevels.length) || ((Math.round((currentLevel / (currentDeaths)) * 100)) / 100 > currentLevel)) {
        resetProgress();
        return null;
    }
    database.ref('players/' + username).set({
        username: name,
        password: password,
        level: currentLevel,
        deaths: currentDeaths,
        ratio: (Math.round((currentLevel / (currentDeaths)) * 100)) / 100
    })

    updateLeaderboard();
}

function resetProgress() {
    currentDeaths = 0;
    currentLevel = 0;
    globalLevel = 1;
    deaths = 0;
    saveProgress();
}

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

setInterval(saveProgress, 5000);

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