
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAgvuup4W1sIRIZBmB75z_66D8i5bqsvKU",
    authDomain: "train-schedule-gt2018.firebaseapp.com",
    databaseURL: "https://train-schedule-gt2018.firebaseio.com",
    projectId: "train-schedule-gt2018",
    storageBucket: "",
    messagingSenderId: "208063586659"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainFreq = 0;
var trainStart = "";
var trainDest = "";
var trainName = "";

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();


    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "hh:mm").format("X");

    var newTrain = {
        name: trainName,
        destination: trainDest,
        frequency: trainFreq,
        start: trainStart
    };

    database.ref().push(newTrain);

    console.log(trainName);
    console.log(trainDest);
    console.log(trainFreq);
    console.log(trainStart);

    alert ("New Train Added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#freq-input").val("");
    $("#start-input").val("");

});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFreq = childSnapshot.val().frequency;
    var trainStart = childSnapshot.val().start;

    console.log(trainName);
    console.log(trainDest);
    console.log(trainFreq);
    console.log(trainStart);

    var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    var tMinutesUntilTrain = trainFreq - tRemainder;
    console.log(tMinutesUntilTrain);

    var nextTrain = moment().add(tMinutesUntilTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var nextArrival = moment(nextTrain).format("hh:mm");

    $("#train-table").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextArrival + "</td><td>" + tMinutesUntilTrain + "</td></tr>")




});