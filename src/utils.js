import Release from "./Release";

const moment = require("moment");
const snoowrap = require("snoowrap");

const r = new snoowrap({
  userAgent: "raphunt",
  clientId: "xuK5vS-L748nxA",
  clientSecret: "NYfSgt5G3LtAcrKAKdTcOUfn500",
  refreshToken: "32794758-tNx3W4t9PtSkyHs2iu9GWV_1ogc"
});

export function getWeeklyTopReleases(callback) {
  console.log(r);
  r.getSubreddit("hiphopheads")
    .search({ query: "[FRESH]", time: "week", sort: "top", limit: 100 })
    .then(posts => {
      const topReleases = {};
      const topPosts = posts.filter(
        post => post.score >= 100 && containsFreshTag(post.title)
      );
      const scores = posts.map(post => post.score);
      const mean = getMean(scores);
      const standardDeviation = getStandardDeviation(scores);
      topPosts.forEach(post => {
        let {
          title,
          url: link,
          created_utc: timestamp,
          selftext_html: html
        } = post;

        title = formatReleaseTitle(title);
        link = html ? getPreferredLinkFromHTML(html) : link;
        const hotness = getHotness(post.score, mean, standardDeviation);
        const release = new Release(title, link, timestamp, hotness);
        const { date } = release;
        topReleases[date] = topReleases[date] || [];
        topReleases[date].push(release);
      });
      callback(topReleases);
    })
    .catch(error => console.log('error',error));
}

export function getDayOfWeek(date) {
  let day = moment(date);
  let today = moment();
  let diff = today.diff(day, "days");

  switch (diff) {
    case 0:
      return "Today";
    case 1:
      return "Yesterday";
    default:
      return day.format("dddd");
  }
}

function getMean(values) {
  return (
    values.reduce((totalScore, value) => totalScore + value, 0) / values.length
  );
}

function getStandardDeviation(values) {
  const mean = getMean(values);
  let sum = 0.0;
  values.forEach(value => {
    sum += Math.pow(value - mean, 2);
  });
  return Math.sqrt(sum / values.length);
}

function getHotness(value, mean, standardDeviation) {
  return (value - mean) / standardDeviation;
}

function getFreshTagMatches(str) {
  const regex = /\[FRESH\s*([\w\s]+)?\]/i;
  return str.match(regex);
}

function containsFreshTag(str) {
  return getFreshTagMatches(str) !== null;
}

function formatReleaseTitle(title) {
  const matches = getFreshTagMatches(title);

  if (matches === null) {
    return null;
  }

  const freshLabel = matches[0]; // [FRESH <Type>]
  const freshType = matches[1]; // <Type>

  let newTitle =
    typeof freshType === "undefined"
      ? title.replace(freshLabel, "") // song
      : title.replace(freshLabel, `[${freshType}]`); // video, EP, etc.
  newTitle = newTitle.replace(/[\u200B-\u200E\uFEFF]/g, ""); // zero-width characters
  newTitle = newTitle.trim(); // trailing/leading spaces

  return newTitle;
}

function getLinksFromHTML(html) {
  const regex = /<a[^>]+href=["'](.*?)["']>/gi;
  let result;
  const links = [];

  while ((result = regex.exec(html))) {
    // link is in the 1st capture group, not the entire match
    links.push(result[1]);
  }

  return links;
}

function getPreferredLinkFromHTML(html) {
  const links = getLinksFromHTML(html);

  const types = [
    "spotify",
    "apple",
    "google",
    "tidal",
    "soundcloud",
    "youtube"
  ];

  types.forEach(type => {
    links.forEach(link => {
      if (link.includes(type)) {
        return link;
      }
    });
  });

  return links[0];
}
