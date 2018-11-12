import React from "react";
import TopTracks from "./TopTracks.js";

export default class SearchResults extends React.Component {
  render() {
    if (this.props.results) {
      return (
        <div>
          {this.props.results.message.body.track_list.map(track => {
            return <TopTracks track={track.track} key={track.track.track_id} />;
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}
