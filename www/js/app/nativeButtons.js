//disable back button and apply custom command
document.addEventListener("backbutton", function (e) {
    e.preventDefault();
    //if in player page, go back
    if (inPlayer) {
        goBack();

    } else {
        if (prevPage == 1) {
            cordova.plugins.backgroundMode.moveToBackground();
        }

        if (prevPage == 2) {
            $('#headerSubTitle').text("Channels");
            $('#podcastList').hide();
            $('#sourcesList').fadeIn();
        }
    }

}, false);

//exit app
function exitApp() {
    navigator.app.exitApp();
}