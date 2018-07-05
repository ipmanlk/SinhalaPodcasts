//toggle podcast list / player
function podcastListVisible(val) {
    if (val) {
        $('#playerContent').hide();
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