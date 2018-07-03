//show podcasts from selected source
function loadSource(customSource) {
    prevPage = 2;
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

//show recent podcasts
function loadPodcasts(response) {
    $('#podcastList').empty();

    //limit for recent podcasts
    var limit = -1;
    var counter = 0;

    if (prevPage == 1) {
        limit = 15;
    }

    for (item in response) {
        if (counter == limit) { break; }
        var img = getLogo(response[item].source);
        //dynamically add list items to list view
        $("#podcastList").append('<li><a href="#" onclick="playPodcast(' + item + ');"><img src="' + img + '"><h2>' + response[item].title + '</h2><p> ' + response[item].dateTime + ' </p></a></li>').listview('refresh');
        counter++;
    }

}