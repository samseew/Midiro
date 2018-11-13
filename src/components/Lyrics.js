import React from "react";
const apiKey = "c23746a7d74044e5a0c5191e173cc346";

export default class Lyrics extends React.Component {
  constructor() {
    super();
    this.state = {
      track: null,
      lyrics: null
    };
  }

  componentDidMount() {
    fetch(
      // lyrics
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
        this.props.match.params.id
      }&apikey=${apiKey}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          lyrics: data
        });
      });

    fetch(
      // top ten tracks
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
        this.props.match.params.id
      }&apikey=${apiKey}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          track: data
        });
      });
  }
  render() {
    if (this.state.track) {
      return (
        <div>
          <p>
            Track Name:
            {this.state.track.message.body.track.track_name}
          </p>
          <p>
            Track By:
            {this.state.track.message.body.track.artist_name}
          </p>

          <p>Lyrics:</p>

          {this.state.lyrics
            ? this.state.lyrics.message.body.lyrics.lyrics_body
            : null}
        </div>
      );
    } else {
      return null;
    }
  }
}
