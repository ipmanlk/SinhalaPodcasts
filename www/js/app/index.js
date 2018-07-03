//variable for player element
var podcastPlayer = document.getElementById('podcastPlayer');

//switch for play pause player
var playerState = null;

//selected podcast id
var selectedPodcastId;

//to remember previous page
// 1 = recent items (home page)
// 2 = channels page (sources list)
var prevPage;

//to check if in player page
var inPlayer;


// when device is ready
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

    //enable background mode
    backgroundMode();

    //check local storage
    if (localStorage.getItem('podcastData') === null) {
        getPodcastsOnline();
    } else {
        getPodcastsOffline();
    }

    //run background task
    checkUpdates();
}

//loading spinner for events takes time
function showLoading(val) {
    if (val) {
        $.mobile.loading("show", {
            text: "Loading",
            textVisible: true,
            theme: "b"
        });
    } else {
        $.mobile.loading("hide");
    }
}

// //load content
// function loadContent(id, file) {
//     $.get(file, function (response) {
//         $(id).html(response).enhanceWithin();
//     });
// }





