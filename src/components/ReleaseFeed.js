import React from "react";
import ReleaseList from "./ReleaseList";
import { getDayOfWeek } from "../utils.js";

function ReleaseFeed(props) {
  const dates = Object.keys(props.releases)
    .sort()
    .reverse();

  return dates.map(date => {
    const dayOfWeek = getDayOfWeek(date);
    return (
      <ReleaseList
        key={dayOfWeek}
        name={dayOfWeek}
        releases={props.releases[date]}
      />
    );
  });
}

export default ReleaseFeed;
