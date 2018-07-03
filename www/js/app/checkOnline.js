//check online status
document.addEventListener("offline", onOffline, false);

function onOffline() {
    alert("You are offline!. Please connect to the Internet!.");
    exitApp();
}