//get podcasts from online
function getPodcastsOnline() {
    prevPage = 1;
    showLoading(true);
    $.ajax({
        type: 'post',
        url: 'https://podcasts.navinda.xyz/podcastData.php!',
        dataType: 'json',
        timeout: 60000, //60s

        success: function (podcastData) {
            loadPodcasts(podcastData);
            //store data in local storage
            localStorage.setItem('podcastData', JSON.stringify(podcastData));
            showLoading(false);
        },

        error: function (obj) {
            alert("Sorry!. Something went wrong. : " + obj.responseText);
            showLoading(false);
        }
    });
}

//get podcasts from local storage
function getPodcastsOffline() {
    prevPage = 1;
    $('#sourcesList').hide();
    $('#podcastList').empty();
    $('#podcastList').fadeIn();
    var podcastData = JSON.parse(localStorage.getItem('podcastData'));
    loadPodcasts(podcastData);
    $('#headerSubTitle').text("Recent Podcasts");
    podcastListVisible(true);
}