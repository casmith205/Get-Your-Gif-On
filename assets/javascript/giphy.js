// Instructions
// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
// Your app should take the topics in this array and create buttons in your HTML.
// Try using a loop that appends a button for each string in the array.

// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
// Under every gif, display its rating (PG, G, so on).


// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.


// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.


$(document).ready(function() {

//SETTING GLOBAL VARIABLES
    var topics = ["dog", "cat", "penguin", "bear"];
    var apiKey = "gBMwoy1kuUu2WyiV4tlNZ0Lr9zXGz6Hz"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+"bear"+"&limit=10&api_key=" + apiKey;

// ON-PAGE EVENTS
  // On the click of the search animal button...
    $("#add-animal").on("click", function(){
      event.preventDefault();
      // This line will grab the text from the input box
      var animal = $("#search-input").val().trim();
      topics.push(animal);
      console.log(topics);
      renderButtons();
    });


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });

    
// DEFINING FUNCTIONS
  // Function for displaying animal buttons
  function renderButtons() {
  // Deletes the animals prior to adding new animals
  $(".buttons").empty();
  // loops through the array and adds the button and appends to the button section
    for (var i = 0; i < topics.length; i++) {
      var btn = $("<button>");
      btn.addClass("animal");
      btn.attr("data-name", topics[i]);
      btn.text(topics[i]);
      $(".buttons").append(btn);
    }
  };

  // Adding click event listeners to all elements with a class of "animal"
  $(document).on("click", ".animal", displayMovieInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
});