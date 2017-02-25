// in-class examples that will help:
// working-movie-app
// cat-button-students
// button-triggered-ajax-students
// dynamic-elements-students
// pausing-gifs-students

$(document).ready(function(){

  // Initial array of sports
  var sports = ["Basketball", "Tennis", "Lacrosse", "Golf"];

  // function that displays the sports in the array as buttons
  function buildButtons () {
        // Looping through the array of sports
        for (var i = 0; i < sports.length; i++) {
          // Then generating buttons for each sport in the array
          var buttonBuild = $("<button>");
          // Adding a class of sport to our button
          buttonBuild.addClass("sport");
          // Adding a data-attribute
          buttonBuild.attr("data-name", sports[i]);
          // Providing the initial button text
          buttonBuild.text(sports[i]);
          // Adding the button to the buttons-view div
          $("#sportButtons").append(buttonBuild);
        }
  }

 // buildButtons ();

  // function that displays images/content for each button
  function displayImages () {
    // resets the sports-view container
    $("#sports-view").empty();
    //images appear when button is clicked
    // bind click event on the sports buttons
    $("button").on("click", function() {
      // creating a variable that will make the buttons act as giphy tags
      var tag = $(this).attr("data-name");
      console.log(tag);
      // assign the api url we wish to query to a variable and limit results to 10
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
                  tag + "&api_key=dc6zaTOxFJmzC&limit=10";

      // request data from api using AJAX
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // process ajax call response
      .done(function(response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          // Make a div with jQuery and store it in a variable named sportDiv.
          var sportDiv = $("<div>");
          // Make a paragraph tag with jQuery and store it in a variable named p.
          var p = $("<p>");
          // Set the inner text of the paragraph to the rating of the image in results[i].
          p.text("Rating: " + results[i].rating);
          // Make an image tag with jQuery and store it in a variable named sportImage.
          var sportImage = $("<img>");
          // Set the image's src to results[i]'s fixed_height.url.
          sportImage.attr("src", results[i].images.fixed_height.url);
          // Append the p variable to the sportDiv variable.
          sportDiv.append(p);
          // Append the sportImage variable to the animalDiv variable.
          sportDiv.append(sportImage);
          // Prepend the sportDiv variable to the element with an id of gifs-appear-here.
          $("#sports-view").prepend(sportDiv);
        }
      });
    });
  };

  displayImages();


  // What happens when a sports button is clicked
  $("#addSport").on("click", function(event) {
    event.preventDefault();
    // Grabbing the input from the textbox
    var tag = $("#sport-input").val().trim();
    // Adding the sports input to the original sports array
    sports.push(tag);
    //emptying the sportButtons div so all the buttons aren't displayed again
    $("#sportButtons").empty();
    // Calling renderButtons which handles the processing of our sports array
    buildButtons();
    });

  // // when submit button is clicked, the userInput function is executed 
  // // and the user's input is added to the array
  // $("#addSport").on("click", function() {
  //   userInput();
  // })

        // Adding a click event listener to all elements with a class of "sport"
      $(document).on("click", ".sport", displayImages);

      // Calling the renderButtons function to display the intial buttons
      buildButtons();

});