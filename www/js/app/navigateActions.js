function goBack() {
    inPlayer = false;
    
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