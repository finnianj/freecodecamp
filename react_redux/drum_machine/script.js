$(document).ready(function() {

$("#crashone").click(function() {
	 $("#Q").trigger('play');
   $("#display").html("Thump");
});
$("#crashtwo").click(function() {
  $("#W").trigger('play');
  $("#display").html("Thump 2");
});
$("#ride").click(function() {
  $("#E").trigger('play');
  $("#display").html("Thump 3");
});
$("#snare").click(function() {
  $("#A").trigger('play');
  $("#display").html("Chord");
});
$("#hitom").click(function() {
  $("#S").trigger('play');
  $("#display").html("Clap");
});
$("#midtom").click(function() {
  $("#D").trigger('play');
  $("#display").html("Open Hat");
});
$("#kick").click(function() {
  $("#Z").trigger('play');
  $("#display").html("Kick");
});
$("#cowbell").click(function() {
  $("#X").trigger('play');
  $("#display").html("Sub Kick");
});
$("#lowtom").click(function() {
  $("#C").trigger('play');
  $("#display").html("Chick");
});



$(document).keyup(function() {

  switch (event.key) {
    case "Q":
    case "q":
	    $("#Q").trigger('play');
      $("#display").html("Thump");
      break;
    case "W":
    case "w":
	    $("#W").trigger('play');
      $("#display").html("Thump 2");
      break;
    case "E":
    case "e":
	    $("#E").trigger('play');
      $("#display").html("Thump 3");
      break;
    case "A":
    case "a":
	    $("#A").trigger('play');
      $("#display").html("Buzz");
      break;
    case "S":
    case "s":
	    $("#S").trigger('play');
      $("#display").html("Clap");
      break;
    case "D":
    case "d":
	    $("#D").trigger('play');
      $("#display").html("Open Hat");
      break;
    case "Z":
    case "z":
	    $("#Z").trigger('play');
      $("#display").html("Kick");
      break;
    case "X":
    case "x":
	    $("#X").trigger('play');
      $("#display").html("Sub Kick");
      break;
    case "C":
    case "c":
	    $("#C").trigger('play');
      $("#display").html("Chick");
      break;
  }
});
});
//JQUERY--END-----------------------

function play (letter) {
  document.getElementById(`${letter.toUpperCase()}`).play()
}




