var database = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

// Capture Button Click
$("#add-train").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    trainName = $("#trainInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrain = $("#firstTrainInput").val();
    frequency = $("#frequencyInput").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

    var addTableRow = $("<tr>");
    var addTrainName = $("<th>", { scope: "row" });
    var addDestination = $("<td>")
    var addFirstTrain = $("<td>");
    var addFrequency = $("<td>");
    var addMinutesAway = $("<td>");

    var theirTime = new Date(new Date().toLocaleDateString() + " " + firstTrain + ":00");
    var currentTime = new Date();
    var timeDiff = currentTime - theirTime;
    timeDiff /= 1000;
    timeDiff /= 60;
    var minutesAway = Math.ceil(Math.ceil(timeDiff / frequency) * frequency - timeDiff);

    var completedRow = addTableRow.append(
        addTrainName.text(trainName),
        addDestination.text(destination),
        addFirstTrain.text(firstTrain),
        addFrequency.text(frequency),
        addMinutesAway.text(minutesAway)
    );

    $("#tbody").append(completedRow);
});