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

//play podcast
function playPodcast(id) {
    inPlayer = true;
    podcastListVisible(false);
    var podcastData = JSON.parse(localStorage.getItem('podcastData'));
    $('#playerTitle').html(podcastData[id].title);
    $('#headerSubTitle').html(podcastData[id].source);
    $('#playerLogo').attr('src', getLogo(podcastData[id].source));
    $('#playerPost').html(podcastData[id].post);
    podcastPlayer.src = podcastData[id].mp3;
    selectedPodcastId = id;
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