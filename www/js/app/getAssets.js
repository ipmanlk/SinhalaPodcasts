//get channel logo
function getLogo(source) {
    switch (source) {
        case "TechKatha":
            return ('./img/logo/TechKatha.png');
        case "Illumination Cast":
            return ('./img/logo/IlluminationCast.png');
        case "HyperStella":
            return ('./img/logo/HyperStella.png');
        case "MindHorizon":
            return ('./img/logo/MindHorizon.png');
        case "Daylight Podcast":
            return ('./img/logo/DaylightPodcast.png');
        case "Micro Science":
            return ('./img/logo/MicroScience.png');
        case "MCUSL-Talk":
            return ('./img/logo/MCUSL-Talk.png');
        case "Sanhinda Podcast":
            return ('./img/logo/SanhindaPodcast.png');
        case "Binary Podcast":
            return ('./img/logo/BinaryPodcast.png');
        case "Music.lk":
            return ('./img/logo/Music.lk.png');
        case "Topic Eka Podcast":
            return ('./img/logo/TopicEkaPodcast.png');
        default:
            return ('./img/logo/Default.png');
    }
}