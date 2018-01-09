$(function() {
    //empty topics array for added topics to be pushed too
    var topics = [];

    function displayGIF(subject) {
        
        var x = $(this).data('search');
        console.log(x);
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + x + '&api_key=SBqBg2qxXWF2KLGyPIGECWeXFPRxN6n1&limit=10';
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method:"GET"
        }).done(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                var showDiv = $("<div class='col-md-6'>");
                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
            
                showImage.attr("src", staticSrc);
                showImage.addClass("giphy");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#GIFS").prepend(showDiv);
            }
        });
    }
    
    //CLICK EVENT TO ADD SEARCH TERMS TO TOPICS ARRAY AND BUTTONS
    $("#addShow").on("click", function(event) {
        event.preventDefault();
        var newTopic = $("#politiInput").val().trim();
        topics.push(newTopic);
        console.log(topics);
        $("#politiInput").val('');
        displayButtons();
    });

    //FUNCTION FOR CREATING BUTTONS FROM SEARCH TERMS
    function displayButtons() {
        $("#newButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button class='btn btn-primary'>");
            a.attr("id", "politician");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#newButtons").append(a);
        }
    }

    //CALL DISPLAY BUTTON FUNCTION TO ALWAYS DISPLAY TOPICS ARRAY
    //ON-CLICK EVENTS TO DISPLAY GIFS AND ANIMATE THEM
    displayButtons();
    $(document).on("click", "#politician", displayGIF);
    $(document).on("click", ".giphy", animateGIF);

    //THIS FUNCTION TO ANIMATE THE GIFS IS ALMOST ENTIRELY COPY/PASTED
    //STILL WORKING ON UNDERSTANDING HOW IT WORKS
    //I THINK IT'S THE SCOPE I'M STRUGGLING WITH
    function animateGIF() {
       var state = $(this).attr("data-state");
       if (state === "still") {
         $(this).attr("src", $(this).attr("data-animate"));
         $(this).attr("data-state", "animate");
       } else {
         $(this).attr("src", $(this).attr("data-still"));
         $(this).attr("data-state", "still");
        }
    }
});
