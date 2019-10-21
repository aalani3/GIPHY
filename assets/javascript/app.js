$(document).ready(function() {

    var pageButtons = ["soccer", "tennis", "basketball", "rugby", "football", "biking"];
    
    var offset = 0;
    
    var apiKey = "&api_key=L29IRGgQkRf9BpFPhc86a33iWws1G6yB";
    
    //Creates buttons from pageButtons array and gives each a sport and offset attribute, name and class
    function makeButton() {
        $("#buttonHolder").empty();
        for (var i = 0; i < pageButtons.length; i++) {
            var myButton = $("<button>");
            myButton.attr("data-sport", pageButtons[i]);
            myButton.attr("data-offset", 0);
            myButton.html(pageButtons[i]);
            myButton.addClass("button");
            $("#buttonHolder").prepend(myButton);
        }
    }
    
    //On button click, the AJAX query is sent using the button attributes.
    
    
    $(document).on("click", ".button", function() {
        var sport = $(this).attr("data-sport");
        var currentOffset = $(this).attr("data-offset");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
            sport + "&limit=10&offset=" + currentOffset + "&rating=G&lang=en" + apiKey;
        var newOffset = 10 + parseInt(currentOffset);
        $(this).attr("data-offset", newOffset);
    
        $.ajax({
          url: queryURL,
          method: "GET"
        })
            .then(function(response) {
    
            var userImages = response.data;
    
            for (var i=0; i<response.data.length; i++) {
                var bothDiv = $("<div>");
                bothDiv.addClass("imageP");
                var p = $("<p>");
                var gifTitle = $("<p>");
                var imgGif = $("<img>");
                imgGif.attr("src", userImages[i].images.fixed_height_small_still.url);
                imgGif.attr("data-still", userImages[i].images.fixed_height_small_still.url);
                imgGif.attr("data-moving", userImages[i].images.fixed_height_small.url);
                imgGif.attr("data-state", "still");            
                imgGif.attr("alt", "sport image");
                imgGif.addClass("sportImage");
                gifTitle.addClass("gifTitle");
                gifTitle.text(userImages[i].title);
                p.text("Rated: " + userImages[i].rating);
                bothDiv.prepend(p);
                bothDiv.prepend(gifTitle);
                bothDiv.prepend(imgGif);            
                $("#images").prepend(bothDiv);
            }
        });
    });
    
    //Changes the state on image click which enables the gif to play or stop
    $(document).on("click", ".sportImage", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-moving"));
            $(this).attr('data-state', "moving");
          }
          else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr('data-state', "still");
          }
    });
    
    
    $("#add-sport").on("click", function(event) {
        event.preventDefault();
        var sport = $("#sport-input").val().trim();
        pageButtons.push(sport);
        makeButton();
        $("#gif-form").find('input:text').val("");
      });
    
    makeButton();
     
    });