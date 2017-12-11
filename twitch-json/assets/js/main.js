// Runs jQuery when the site is rendered
$(document).ready(function () {
  // Get code camp twitch info
	let API_KEY = '?client_id=ngew0hqg72guav25o526j0pdleeeza';
	let onlineStreams = [];
	let offlineStreams = [];

	function printStreamers (arr, isOnline) {
		$(".infoHolder").remove();
		let online = "ONLINE";
		let offline = "OFFLINE";
	
		for (let i = 0; i < arr.length; i++) {
			if (isOnline) {
				$("#displayStream").append("<div class='col-md-10 col-md-offset-1 infoHolder " + online.toLowerCase() + "'> <img class='imgHolder col-md-1' src='" + arr[i].logo + "'></img> <a class='links' href='" + arr[i].url + "'> <h2 class='col-md-2'>" + arr[i].display_name + "</h2></a> <p class='col-md-1'>" + online + "</p> <h4 class='col-md-5'>" + arr[i].status + "</h4> </div>");
			} 
			else if (isOnline === false) {
				$("#displayStream").append("<div class='col-md-10 col-md-offset-1 infoHolder'> <img class='imgHolder col-md-1' src='" + arr[i].logo + "'></img> <h2 class='col-md-2'>" + arr[i].display_name + "</h2> <p class='col-md-1'>" + offline + "</p>  </div>");
			}
			else {
				if (i < onlineStreams.length) {
					$("#displayStream").append("<div class='col-md-10 col-md-offset-1 infoHolder " + online.toLowerCase() + "'> <img class='imgHolder col-md-1' src='" + arr[i].logo + "'></img> <a class='links' href='" + arr[i].url + "'> <h2 class='col-md-2'>" + arr[i].display_name + "</h2></a> <p class='col-md-1'>" + online + "</p> <h4 class='col-md-5'>" + arr[i].status + "</h4> </div>");
				} 
				else {
					$("#displayStream").append("<div class='col-md-10 col-md-offset-1 infoHolder'> <img class='imgHolder col-md-1' src='" + arr[i].logo + "'></img> <h2 class='col-md-2'>" + arr[i].display_name + "</h2> <p class='col-md-1'>" + offline + "</p>  </div>");
				}
			}		
		}	
	}


	$("#getAllStreams").on("click", function() {
		$("#getAllStreams").addClass("active");
		$("#getOnlineStreams").removeClass("active");
		$("#getOfflineStreams").removeClass("active");
		let allStreams = onlineStreams.concat(offlineStreams);
		printStreamers(allStreams, "");
	});

	$("#getOnlineStreams").on("click", function() {
		$("#getOnlineStreams").addClass("active");
		$("#getAllStreams").removeClass("active");
		$("#getOfflineStreams").removeClass("active");
		printStreamers(onlineStreams, true);
	});

	$("#getOfflineStreams").on("click", function() {
		$("#getOfflineStreams").addClass("active");
		$("#getAllStreams").removeClass("active");
		$("#getOnlineStreams").removeClass("active");
		printStreamers(offlineStreams, false);
	});


	$("input").keypress(function(e) {
		// e.which = 13 is the enter key. The query only gets accepted when the enter key is pressed down.
		if (e.which === 13) {
			let userSearch = $("#searchStream").val();
			let urlStream = 'https://api.twitch.tv/kraken/streams/'+ userSearch + API_KEY;
			$.getJSON(urlStream, function (streamData) {
				if (streamData.stream === null) {
					urlStream = 'https://api.twitch.tv/kraken/users/'+ userSearch + API_KEY
					$.getJSON(urlStream, function(userData) {
						offlineStreams.push(userData);
						printStreamers(offlineStreams, false);	
					});        
				} 
				else {			
					onlineStreams.push(streamData.stream.channel);
					printStreamers(onlineStreams, true);
				}				
			});
		}
	});
});