
var API_KEY = "AIzaSyBOHMzWluYOpzWy_4apY8WdfajS09iT-EU"
let url = "https://www.googleapis.com/youtube/v3/search?"
console.log("au debut");
let video = ""
let videos = document.querySelector(".row");
let searchInput = document.querySelector('#search');
searchInput.value = localStorage.getItem('inputVal')

function videoBox(title, videoId) {
	console.log("dans vid BOX");
	return (
		`
			<div class="videoBox">
				<div class="vidTitle">${title}
				<iframe class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3" id="ytplayer" type="text/html" width="440" height="260"
					src="http://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com"
					frameborder="0"/>
			</div>
		`
	)
}

function showDefaultVideos() {
	console.log("chargement des video par defaut");
	$(document).ready(function () {
		$.get(url + "key=" + API_KEY + "&type=video&part=snippet&maxResults=4", (data) => {
			console.log(data.items);
			data.items.forEach((item, index) => {

				video = videoBox(item.snippet.title, item.id.videoId)

				videos.innerHTML = videos.innerHTML + video
			});
		})
	})
}
// showDefaultVideos()

// let form = document.querySelector('#form');
function handleSubmit(event) {
	event.preventDefault()

	var search = $("#search").val()
	localStorage.setItem("inputVal", search)

	videoSearch(API_KEY, search, 30)
}
console.log("dans video search");
function videoSearch(key, search, maxResults) {

	console.log("l'url est :", url + "key=" + key + "&type=video&part=snippet&maxResults=5");
	$.get(url + "key=" + key + "&type=video&part=snippet&maxResults=15&q=" + search, (data) => {
		console.log(data.items);
		videos.innerHTML = "";
		data.items.forEach((item, index) => {
			console.log("je suis dans for");
			video = `

				<iframe class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4" id="ytplayer" type="text/html" width="440" height="260"
					src="http://www.youtube.com/embed/${item.id.videoId}?autoplay=1&origin=http://example.com"
					frameborder="0"/>
				`
			videos.innerHTML = videos.innerHTML + video
		});


	})
}
console.log("en haut de togle click");
function toggleClick(event) {
	console.log(event.target);
	if (document.querySelector(".videos").style.marginTop == "280px") {
		document.querySelector(".videos").style.marginTop = "80px"
	} else {
		document.querySelector(".videos").style.marginTop = "280px"
	}
	console.dir(document.querySelector(".videos").style.marginTop);
}


//  $.get(url + "key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, (data) => { console.log(data); })

//  https://www.googleapis.com/youtube/v3/search?key=AIzaSyBOHMzWluYOpzWy_4apY8WdfajS09iT-EU&type=video&part=snippet&maxResults=30&q=soro

//  https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBOHMzWluYOpzWy_4apY8WdfajS09iT-EU&type=video&q=python3
//280px