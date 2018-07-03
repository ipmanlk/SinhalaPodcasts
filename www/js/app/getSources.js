//load sources
function loadSources() {
    prevPage = 2;
    podcastListVisible(true);
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