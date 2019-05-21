var navBar, navListItem, navItem; // variables for the navigation bar
var homeDiv, homeTitle, homeButton, homeArrow, homeDivSpace; // variables for the home/splash page
var settingsDiv, innerSettingsDiv, settingsTitle, settingsButton, settingsArrow, // variables for the settings page
    settingsTable, settingsRow, settingsCell1, settingsCell2, settingsDescription,
    settingsButton, settingsMultiplayer;
var aboutDiv, innerAboutDiv, aboutTitle, aboutTitle2, aboutParagraph, aboutTable, // variables for the about page
    aboutRow, aboutCell1, aboutCell2, aboutSubtitle, aboutSubparagraph;
var winDiv, innerWinDiv, winTitle, winTable, winRow, winCell1, winCell2, winParagraph, // variables for the win page
    winSecretWordTitle, winWordNode, winButtonAgain, winButtonEnd;
var loseDiv, innerLoseDiv, loseTitle, loseTable, loseRow, loseCell1, loseCell2, loseParagraph, // variables for the lose page
    loseSecretWordTitle, loseWordNode, loseButtonAgain, loseButtonEnd;
var endDiv, innerEndDiv, endTitle, endTable, endRow, endCell1, endCell2, endParagraph, // variables for the end page
    endStatsButton, endAboutButton;
var statsDiv, innerStatsDiv, statsTable, statsRow, statsCell1, statsCell2, statsCell3, // variables for the stats page
    statsTitle, statsRatioPara, statsRatioTitle, statsRatio, statsWinPara, statsWinTitle,
    statsWin, statsLosePara, statsLoseTitle, statsLose;
var loadingDiv, loadingDivSpace; // variables for the loading div (hangman moving across screen between pages)
var category, secretWord, blankWordList; // variables related to the secret word
var allowedGuesses, wrongGuesses, remainingGuesses, timeLeft, timer, // variables related to the win/loss conditions of the game
    wins = 0,
    losses = 0,
    total = 0;
var thirdRow, generalCell, inputForm, fullGuess, submitGuess, timerContainer, timerValue, // variables for the game page
    remainingGuessesContainer, remainingGuesses, guessedContainer, guessedNode, hintButtonNode,
    secretWordCell, secretWordContainer, secretWordNode, gameTable, letterCount, hintButton,
    randomLetter, hintOver;
var bgAudio, bgAudioFile, wrongAudio, wrongAudioFile, rightAudio, rightAudioFile, winAudio, // variables for audio files
    winAudioFile, loseAudio, loseAudioFile;

var body = document.createElement("center");
document.body.appendChild(body);

// top navigation bar
navBar = document.createElement("ul");
navBar.className = "header"

navListItem = document.createElement("li");
navListItem.className = "navLogo";

navItem = document.createElement("img"); // header image fixed on the left side of the page
navItem.setAttribute("src", "assets/images/branding/logo.png");
navItem.setAttribute("height", "35px");
navItem.setAttribute("style", "float: left; cursor: pointer;");
navItem.addEventListener("click", showHome)

navBar.appendChild(navListItem);
navListItem.appendChild(navItem);

for (let navCounter = 0; navCounter < 4; navCounter++) { // creating all nav bar items as list items
    navListItem = document.createElement("li");
    navItem = document.createElement("a");
    navBar.appendChild(navListItem);
    navListItem.appendChild(navItem);

    switch (navCounter) {
        case 0:
            navItem.appendChild(document.createTextNode("home"));
            navItem.addEventListener("click", showHome);
            break;
        case 1:
            navItem.appendChild(document.createTextNode("settings"));
            navItem.addEventListener("click", showSettings);
            break;
        case 2:
            navItem.appendChild(document.createTextNode("game"));
            navItem.addEventListener("click", showGame);
            break;
        default:
            navItem.appendChild(document.createTextNode("about"));
            navItem.addEventListener("click", showAbout);
            break;
    }
}

body.appendChild(navBar);

function showHome() {};

function showSettings() {};

function showGame() {};

function showAbout() {};