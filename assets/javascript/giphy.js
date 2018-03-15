
// Be sure to read about these GIPHY parameters (hint, hint): q, limit, rating

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
// Deploy your assignment to Github Pages.
// Rejoice! You just made something really cool.



$(document).ready(function() {

    var topics = ["dog", "cat", "penguin", "bear"];

    var apiKey = "gBMwoy1kuUu2WyiV4tlNZ0Lr9zXGz6Hz"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+"bear"+"&limit=10&api_key=" + apiKey;

    $("#add-animal").on("click", function(){
      event.preventDefault();
      // This line will grab the text from the input box
      var animal = $("#search-input").val().trim();
      // The movie from the textbox is then added to our array
      topics.push(animal);
      console.log(topics)
    });


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });

    
    
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    // displayMovieInfo function re-renders the HTML to display the appropriate content
     function displayMovieInfo() {

       var movie = $(this).attr("data-name");
       var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

       // Creates AJAX call for the specific movie button being clicked
       $.ajax({
         url: queryURL,
         method: "GET"
       }).then(function(response) {
         // Creates a div to hold the movies
         var newDiv = $("<div class='movie'>");
         // Creates a paragraph element to have the rating displayed; you get the rating through (response.Rated)
         var ratingP = $("<p>").text("Rating: " + response.Rated);
         
         // Displays the rating by appending it to the "new div" w created
         newDiv.append(ratingP);
         
         // Creates an element to hold the release year and adds the release date to it with the (response.Released). 
         // I made this one look different to show a different way to push the text
         var releaseP = $("<p> Release Date: " + response.Released + "</p>")
        
         newDiv.append(releaseP);

         // Creates an element to hold the plot and calls the Plot from the API using response.Plot
         var plotP = $("<p>").text("Plot: "+ response.Plot);

         newDiv.append(plotP);

         // Creates an element to hold the image
         // it order to add an image, create an image div, then change the attributes using .attr and then ("src", response.Poster)
         // response.Poster is the URL for the picture
         var image = $("<img>").attr("src", response.Poster);

         newDiv.append(image);
         
         // Puts the entire Movie above the previous movies.
         $("#movies-view").prepend(newDiv);
       });

     }

     // Function for displaying movie data
     function renderButtons() {

       // Deletes the movies prior to adding new movies
       // (this is necessary otherwise you will have repeat buttons)
       $("#buttons-view").empty();
       // Loops through the array of movies
       for (var i = 0; i < topics.length; i++) {

         // Then dynamicaly generates buttons for each movie in the array
         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
         var a = $("<button>");
         // Adds a class of movie to our button
         a.addClass("animal");
         // Added a data-attribute
         a.attr("data-name", topics[i]);
         // Provided the initial button text
         a.text(topics[i]);
         // Added the button to the buttons-view div
         $("#buttons-view").append(a);
       }
     }

     // This function handles events where the add movie button is clicked
     $("#add-movie").on("click", function(event) {
       event.preventDefault();
       // This line of code will grab the input from the textbox
       var movie = $("#movie-input").val().trim();

       // The movie from the textbox is then added to our array
       movies.push(movie);

       // Calling renderButtons which handles the processing of our movie array
       renderButtons();
     });

     // Adding click event listeners to all elements with a class of "movie"
     $(document).on("click", ".movie", displayMovieInfo);

     // Calling the renderButtons function to display the intial buttons
     renderButtons();
});