import React from "react";
import ReactGA from "react-ga";
import fire_icon from "../assets/fire.png";

ReactGA.initialize("UA-126692851-1");
ReactGA.pageview(window.location.pathname + window.location.search);

class ReleaseRow extends React.Component {
  logClick = (title, source) => {
    ReactGA.event({
      category: "Outbound Link Clicked",
      action: source.name,
      label: title
    });
  };

  render() {
    const { release } = this.props;
    return (
      <div className="entry">
        {release.hotness >= 1 && (
          <img className="hotnessIcon" src={fire_icon} alt="FIRE" />
        )}
        <a
          onClick={() => this.logClick(release.title, release.source)}
          href={release.link}
          target="_blank"
          rel="noreferrer noopener"
          className="link"
        >
          <img className="icon" src={release.source.icon} alt={release.title} />
          <div className="title">
            <p>{release.title}</p>
          </div>
        </a>
      </div>
    );
  }
}

export default ReleaseRow;
