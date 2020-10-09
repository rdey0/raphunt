import generic_icon from "./assets/generic.png";
import spotify_icon from "./assets/spotify.png";
import apple_icon from "./assets/apple.png";
import soundcloud_icon from "./assets/soundcloud.png";
import youtube_icon from "./assets/youtube.png";

const url = require("url");
const moment = require("moment");

class Release {
  constructor(title, link, timestamp, hotness) {
    this.title = title;
    this.link = link;
    this.source = this.getSource(link);
    this.hotness = hotness;
    this.timestamp = timestamp;
    this.date = moment
      .unix(timestamp)
      .startOf("day")
      .toISOString();
  }

  getSource(link) {
    let type = ReleaseSource.UNKNOWN;

    if (typeof link !== "string") return type;

    const website = url.parse(link, true).hostname;
    type = website.includes("spotify") ? ReleaseSource.SPOTIFY : type;
    type = website.includes("apple") ? ReleaseSource.APPLE : type;
    type = website.includes("soundcloud") ? ReleaseSource.SOUNDCLOUD : type;
    type =
      website.includes("youtube") || website.includes("youtu.be")
        ? ReleaseSource.YOUTUBE
        : type;
    return type;
  }
}

// todo RapHuntConstants or RapHuntEnums (depending on if it's constants or enums)
// todo: take out "_ENUM"
const ReleaseSource = Object.freeze({
  UNKNOWN: {
    name: "Unknown",
    icon: generic_icon
  },
  SPOTIFY: {
    name: "Spotify",
    icon: spotify_icon
  },
  APPLE: {
    name: "Apple Music",
    icon: apple_icon
  },
  YOUTUBE: {
    name: "YouTube",
    icon: youtube_icon
  },
  SOUNDCLOUD: {
    name: "SoundCloud",
    icon: soundcloud_icon
  }
});

export default Release;
