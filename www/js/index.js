//variable for player element
var podcastPlayer = document.getElementById('podcastPlayer');

//switch for play pause player
var playerState = null;

//selected podcast id
var selectedPodcastId;

//location variable
// 1 = player recent item
// 2 = player channel item
var currentPage;

//background mode
function backgroundMode() {
    cordova.plugins.backgroundMode.setDefaults({
        title: 'Sinhala Podcasts',
        text: 'Running in the background'
    });
    cordova.plugins.backgroundMode.setEnabled(true);
    cordova.plugins.backgroundMode.overrideBackButton();
    cordova.plugins.backgroundMode.excludeFromTaskList();
}

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

//load content
function loadContent(id, file) {
    $.get(file, function (response) {
        $(id).html(response).enhanceWithin();
    });
}

//get podcasts
function getPodcastsOnline() {
    showLoading(true);
    $.ajax({
        type: 'post',
        //url: 'http://localhost/SinhalaPodcast/server_side/podcastData.php',
        url: 'https://podcasts.navinda.xyz/podcastData.php',
        dataType: 'json',
        timeout: 60000, //60s

        success: function (podcastData) {
            loadPodcasts(podcastData);
            //store data in local storage
            localStorage.setItem('podcastData', JSON.stringify(podcastData));
            showLoading(false);
        },

        error: function (obj) {

        }
    });
}

//show podcasts
function loadPodcasts(response) {
    $('#podcastList').empty();
    for (item in response) {
        var img = getLogo(response[item].source);
        //dynamically add list items to list view
        $("#podcastList").append('<li><a href="#" onclick="playPodcast(' + item + ');"><img src="' + img + '"><h2>' + response[item].title + '</h2><p> ' + response[item].dateTime + ' </p></a></li>').listview('refresh');
    }
}

//get img
function getLogo(source) {
    switch (source) {
        case "TechKatha":
            return ('./img/logo/TechKatha.png');
            break;
        case "Illumination Cast":
            return ('./img/logo/IlluminationCast.png');
            break;
        case "HyperStella":
            return ('./img/logo/HyperStella.png');
            break;
        case "MindHorizon":
            return ('./img/logo/MindHorizon.png');
            break;
        case "Daylight Podcast":
            return ('./img/logo/DaylightPodcast.png');
            break;
        case "Micro Science":
            return ('./img/logo/MicroScience.png');
            break;
        case "MCUSL-Talk":
            return ('./img/logo/MCUSL-Talk.png');
            break;
        case "Sanhinda Podcast":
            return ('./img/logo/SanhindaPodcast.png');
            break;
        case "Binary Podcast":
            return ('./img/logo/BinaryPodcast.png');
            break;
    }
}

//play podcast
function playPodcast(id) {
    contentVisible(false);
    var podcastData = JSON.parse(localStorage.getItem('podcastData'));
    $('#playerTitle').text(podcastData[id].title);
    $('#headerSubTitle').text(podcastData[id].source);
    $('#playerLogo').attr('src', getLogo(podcastData[id].source));
    $('#playerPost').text(podcastData[id].post);
    podcastPlayer.src = podcastData[id].mp3;
    selectedPodcastId = id;
}

//toggle content / player
function contentVisible(val) {
    if (val) {
        $('#playerContent').hide();
        $('#footer').hide();
        $('#btnBack').hide();
        $('#content').attr('class', 'contentCustom');
        $('#podcasts').fadeIn();

    } else {
        $('#podcasts').hide();
        $('#content').attr('class', 'contentNormal');
        $(window).scrollTop(0);
        $('#btnBack').fadeIn();
        $('#playerContent').fadeIn();
    }
}

//back button
function goBack() {
    //if playing, stop the player
    if (playerState == 'pause') {
        playPause();
    }

    //change subtitle suitable for the current page
    switch (currentPage) {
        case 1:
            $('#headerSubTitle').text("Recent Podcasts");
            break;
        case 2:
            $('#headerSubTitle').text("Podcasts from " + $('#headerSubTitle').text());
            break;
    }

    contentVisible(true);
}

//play pause podcast player
function playPause() {
    if (playerState == 'play' || playerState == null) {
        playerState = 'pause';
        $('#footer').fadeIn();
        podcastPlayer.play();
        $('#btnPlayerControl').text('Pause');

    } else {
        playerState = 'play';
        podcastPlayer.pause();
        $('#btnPlayerControl').text('Play');
    }
}

//load sources
function loadSources() {
    currentPage = 2;
    contentVisible(true);
    $('#headerSubTitle').text("Channels");

    var podcastData = JSON.parse(localStorage.getItem('podcastData'));
    var currentSource;
    var sources = [];
    var counter = 0;
    for (item in podcastData) {
        currentSource = podcastData[item].source;
        if (sources.indexOf(currentSource) < 0) {
            sources[counter] = currentSource;
            counter++;
        }
    }

    //sort sources
    sources.sort();

    //add to list 
    for (item in sources) {
        $("#sourcesList").append('<li><a href="#" onclick="loadSource(' + "'" + sources[item] + "'" + ');"><img src="' + getLogo(sources[item]) + '"><h2>' + sources[item] + '</h2></a></li>').listview('refresh');
    }

    $('#podcastList').hide();
    $('#sourcesList').fadeIn();
}

//load source
function loadSource(customSource) {
    var podcastData = JSON.parse(localStorage.getItem('podcastData'));

    $('#podcastList').empty();

    for (item in podcastData) {
        if (podcastData[item].source == customSource) {
            var img = getLogo(podcastData[item].source);
            $("#podcastList").append('<li><a href="#" onclick="playPodcast(' + item + ');"><img src="' + img + '"><h2>' + podcastData[item].title + '</h2><p> ' + podcastData[item].dateTime + ' </p></a></li>').listview('refresh');
        }
    }

    $('#headerSubTitle').text("Podcasts from " + customSource);

    $('#sourcesList').hide();
    $('#podcastList').fadeIn();
}

//recent podcasts
function getPodcastsOffline() {
    currentPage = 1;
    $('#sourcesList').hide();
    $('#podcastList').empty();
    $('#podcastList').fadeIn();
    var podcastData = JSON.parse(localStorage.getItem('podcastData'));
    loadPodcasts(podcastData);
    $('#headerSubTitle').text("Recent Podcasts");
    contentVisible(true);
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

//background task
function checkUpdates() {
    var podcastData = JSON.parse(localStorage.getItem('podcastData'));

    $.get("https://podcasts.navinda.xyz/checkUpdates.php", function (data, status) {
        var offlineUpdated = podcastData[0].dateTime;
        var onlineData = JSON.parse(data);
        var notificationTitle = onlineData[0].title;
        var notificationText = 'New podcast from ' + onlineData[0].source;

        if (offlineUpdated !== onlineData[0].dateTime) {
            getPodcastsOnline();
            cordova.plugins.notification.local.schedule({
                title: notificationTitle,
                text: notificationText,
                foreground: true
            });
        }
    });

    //every 15 min
    setTimeout(checkUpdates, 900000);
}

//share
function sharePodcast() {
    var podcastData = JSON.parse(localStorage.getItem('podcastData'));
    var podcastTitle = podcastData[selectedPodcastId].title;
    var podcastUrl = podcastData[selectedPodcastId].url;
    window.plugins.socialsharing.share(podcastTitle + " @ ", null, null, podcastUrl);
}

//download
function downPodcast() {
    var podcastData = JSON.parse(localStorage.getItem('podcastData'));
    var podcastMp3 = podcastData[selectedPodcastId].mp3;
    location.replace(podcastMp3);
}

//check online status
document.addEventListener("offline", onOffline, false);

function onOffline() {
    alert("You are offline!. Please connect to the Internet!.");
    exitApp();
}

//exit app
function exitApp() {
    navigator.app.exitApp();
}