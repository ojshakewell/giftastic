// 			Fool around with the GIPHY API. Giphy API.
// 	Be sure to read about these GIPHY parameters (hint, hint): 
// 	q ,limit rating


// Like many APIs, GIPHY requires developers to use a key to access their API data. For now, you can use their public API key.
// Make sure you switch the protocol in the query URL from http to https, or the app may not work properly when deployed to Github Pages.

$(document).ready(function(){
//create an array of strings, each one related to a topic that interests you. Save it to a variable called topics. 
var topics = ["Richard Simmons", "Russell Simmons", "Gene Simmons", "JK Simmons", "Jemma Simmons"];

var displayButton;

//addToArray();
showButtons();
//Your app should take the topics in this array and create buttons in your HTML.
//Try using a loop that appends a button for each string in the array.
function showButtons(){
		$("#display-buttons").empty();
	for (var i = 0; i < topics.length; i++) {

		displayButton = $('<input type="button" class = "button btn btn-primary" value="' + topics[i] + '"/>');
		$("#display-buttons").append(displayButton);
	}
};

// function addToArray(){
// 		console.log("input");
// 	};

$(document).on("click","#user-submit", function(event){
	event.preventDefault();
	var input = $("#user-input").val();
	console.log(input+"input");
	topics.push(input);
	showButtons();
});

$(document).on("click", ".button", function(){

	var inputData = $(this).attr("value");
	//console.log(inputData)
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + inputData + "&api_key=dc6zaTOxFJmzC&limit=10";
	//console.log(queryURL);
//When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page. 
	$.ajax({
		url: queryURL,
		method: 'GET'
	})
	.done(function(response) {
		var responseData = response.data;
		//console.log(responseData);

		for (var i = 0; i < responseData.length; i++) {

			// create DIV to display gifs
			//display GIF

			var newImage = $("<img class='gif'>");
			newImage.attr("src", responseData[i].images.fixed_height_still.url);
			newImage.attr("data-animate", responseData[i].images.fixed_height.url)
			newImage.attr("data-still", responseData[i].images.fixed_height_still.url);
			newImage.attr("data-state", "still");
			//display Rating
			// Under every gif, display its rating (PG, G, so on). This data is provided by the GIPHY API.
			var rating = responseData[i].rating;
            var ratingTag = $("<p>").text("Rating: " + rating);
            var newDiv = $('<div>');
          

            newDiv.prepend(newImage);
            newDiv.prepend(ratingTag);

            $("#display-gifs").prepend(newDiv);
		}// end for loop

	});//end .done
});//end input.click
});// end .ready
//When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
$(document).on("click",".gif", function(){

		var gifState = $(this).attr("data-state")
		//if the state is still, update the attribute
		if (gifState === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		};//end if
	});



//Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.
