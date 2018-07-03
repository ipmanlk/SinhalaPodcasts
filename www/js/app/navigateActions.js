function goBack() {
    inPlayer = false;
    //if playing, stop the player
    if (playerState == 'pause') {
        playPause();
    }

    //change subtitle suitable for the current page
    switch (prevPage) {
        case 1:
            $('#headerSubTitle').text("Recent Podcasts");
            break;
        case 2:
            $('#headerSubTitle').text("Podcasts from " + $('#headerSubTitle').text());
            break;
    }

    podcastListVisible(true);
}