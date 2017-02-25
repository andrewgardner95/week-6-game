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
          var a = $("<button>");
          // Adding a class of sport to our button
          a.addClass("sport");
          // Adding a data-attribute
          a.attr("data-name", sports[i]);
          // Providing the initial button text
          a.text(sports[i]);
          // Adding the button to the buttons-view div
          $("#sportButtons").append(a);
        }
  }

    buildButtons ();

    function userInput () {
      var input = $("#sport-input").val();
      var imageButton = $("<button>");
      imageButton.on("click", displayImages);
      imageButton.attr("data-name", input);
      imageButton.addClass("imageButton");
      imageButton.text(input);
      $("#sportButtons").append(imageButton);
    }

    $("#addSport").on("click", function() {
      userInput();
    })


  function displayImages () {
    //images appear when button is clicked
    // bind click event on the cat button
    $("button").on("click", function() {
      var tag = $(this).attr("data-name");
      // assign the api url we wish to query to a variable
      var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + tag;

      // request data from api using AJAX
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // process ajax call response
      .done(function(response) {

        // store original image url from the ajax response in a variable
        var imageUrl = response.data.image_original_url;

        // create a new <img> element 
        var tagImage = $("<img>");

        // set the source of our new image
        // to the value of the image received in our ajax call.
        // and give it an alt name
        tagImage.attr("src", imageUrl);
        tagImage.attr("alt", "tag image");

        // select the #images element and add the new catImage to the top of the element
        $("#sports-view").html(tagImage);
      });
    });
  };

  displayImages();



      // This function handles events where a movie button is clicked
      $("#addSport").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var tag = $("#sport-input").val().trim();

        // Adding movie from the textbox to our array
        sports.push(tag);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });




});