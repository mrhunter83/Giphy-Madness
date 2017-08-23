
var topics = ["corvette", "ferrari", "lamborghini", "porsche"]

function appendgif() {
	var searchterm = $(this).attr("data-name");
	console.log(searchterm);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+searchterm+"&api_key=adaab1523e3f41f5a48e04bd4c15eb9a&limit=25&offset=0&rating=G&lang=en"
	$.ajax({
		url: queryURL,
		method: "GET",
	}).done(function(response) {
		console.log(response);
		$("#gifdiv").empty();

		for (var i = 0; i < 10; i++) {
			var rating = response.data[i].rating;
			var stillgif = "<img src="+response.data[i].images.fixed_height_still.url+" data-state=still data-still="+response.data[i].images.fixed_height_still.url+" data-animate="+response.data[i].images.fixed_height.url+" id=gif>";
					// $("#gifdiv").append("<label>"+"Rating: "+rating+"</label>");
					$("#gifdiv").append("<div id=indgifdiv>"+"<p> Rating: "+rating+"</p>"+stillgif+"</div>");
					console.log(searchterm);
				}
			})
}

function switchurl() {
	var state = $(this).attr('data-state');

	if (state === "still") {
		$(this).attr('src', $(this).attr('data-animate'));
		$(this).attr('data-state', 'animate');
	}
	else if(state === "animate") {
		$(this).attr('src', $(this).attr('data-still'));
		$(this).attr('data-state', 'still'); 
	}
}

function topicbtns() {
	$("#btndiv").empty();
	for (i = 0; i < topics.length; i++) {
		var newbtn = $("<button>");
		newbtn.addClass("searchbtn btn");
		newbtn.attr("data-name", topics[i]);
		newbtn.text(topics[i]);
		$("#btndiv").append(newbtn);
	}
}

$("#submitbtn").on('click', function(event) {
	event.preventDefault();
	var newtopic = $("#searchbox").val().trim();
	topics.push(newtopic);
	console.log(topics);
	topicbtns();
})

$(document).on('click', ".searchbtn", appendgif);
$(document).on('click', "#gif", switchurl);

topicbtns();
