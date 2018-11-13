import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TopTracks = props => {
  return (
    <Grid.Column width={5}>
      <div>
        <p>
          {props.track.track_name} by {props.track.artist_name}
        </p>
        <p>Album: {props.track.album_name}</p>
        <Button>
          <Link to={`lyrics/track/${props.track.track_id}`}>Lyrics</Link>
        </Button>
      </div>
    </Grid.Column>
  );
};

export default TopTracks;
