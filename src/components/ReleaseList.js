import React from "react";
import ReleaseRow from "./ReleaseRow";

function ReleaseList(props) {
  return (
    <div className="release-list">
      <h2>{props.name}</h2>
      <div>
        {props.releases.map(release => (
          <ReleaseRow key={release.title} release={release} />
        ))}
      </div>
    </div>
  );
}

export default ReleaseList;
