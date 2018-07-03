//background mode
function backgroundMode() {
    cordova.plugins.backgroundMode.setDefaults({
        title: 'Sinhala Podcasts',
        text: 'Running in the background'
    });
    cordova.plugins.backgroundMode.setEnabled(true);
    //cordova.plugins.backgroundMode.overrideBackButton();
    cordova.plugins.backgroundMode.excludeFromTaskList();
}

//check for new podcasts in background
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