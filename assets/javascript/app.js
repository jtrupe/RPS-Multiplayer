var config = {
    apiKey: "AIzaSyCP4HQo1i26-ajqQN8FU6QJkiuitkGmPDE",
    authDomain: "rps-multiplayer-e5e1e.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-e5e1e.firebaseio.com",
    projectId: "rps-multiplayer-e5e1e",
    storageBucket: "rps-multiplayer-e5e1e.appspot.com",
    messagingSenderId: "474279854251",
    appId: "1:474279854251:web:96ffa0554f1524fee5b7ee"
};

firebase.initializeApp(config);

var database = firebase.database();

// Creating variables to hold the number of wins, losses, and ties. They start at 0.
var P1wins = 0;
var P2wins = 0;
var ties = 0;
var P1name = "";
var P2name = "";
var P1turnTaken = false;
var P2turnTaken = false;
var gameStart = false;

if ((P1name != "") && (P2name != "")) {
    gameStart = true;
}

// Create variables that hold references to the places in the HTML where we want to display things.
var directionsText = document.getElementById("directions-text");
var P1ChoiceText = document.getElementById("player1-text");
var P2ChoiceText = document.getElementById("player2-text");
var P1winsText = document.getElementById("P1wins-text");
var P2winsText = document.getElementById("P2wins-text");
var tiesText = document.getElementById("ties-text");

$(document).on("click", "#addP1", function () {
    event.preventDefault();
    P1name = $("#player1input").val();
    $("#player1input").remove();
    $("#addP1").remove();
    $("#P1label").remove();
    console.log(P1name);
})

$(document).on("click", "#addP2", function () {
    event.preventDefault();
    P2name = $("#player2input").val();
    $("#player2input").remove();
    $("#addP2").remove();
    $("#P2label").remove();
})

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {
    console.log(gameStart);
    if (gameStart) {
        if (!P1turnTaken) {
            var P1guess = event.key;
            P1turnTaken = true;
        }
        else if (!P2turnTaken)
            var P2guess = event.key;
            P2turnTaken = true ;
    }
}
if (gameStart && P1turnTaken && P2turnTaken) { 
    if ((P1guess === "r") || (P1guess === "p") || (P1guess === "s")) {

        if ((P1guess === "r" && P2guess === "s") ||
            (P1guess === "s" && P2guess === "p") ||
            (P1guess === "p" && P2guess === "r")) {
            P1wins++;
        } else if (P1guess === P2guess) {
            ties++;
        } else {
            P2wins++;
        }

        // Hide the directions
        directionsText.textContent = "";

        // Display the user and computer guesses, and wins/losses/ties.
        P1ChoiceText.textContent = "P1 chose: " + P1guess;
        P2ChoiceText.textContent = "P2 chose: " + P2guess;
        P1winsText.textContent = "wins: " + P1wins;
        P2winsText.textContent = "losses: " + P2wins;
        tiesText.textContent = "ties: " + ties;
    }

};