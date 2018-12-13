import React from "react";
import TopTracks from "./TopTracks.js";
import { Grid } from "semantic-ui-react";
import Search from "./Search.js";
import SearchResults from "./SearchResults.js";

const apiKey = "c23746a7d74044e5a0c5191e173cc346"; //Musix Match

export default class LyricsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      topTen: null,
      searchResults: null
    };
  }

  componentDidMount() {
    fetch(
      // top ten tracks
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${apiKey}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          topTen: data,
          input: ""
        });
      });
  }

  handleSubmit = (e, searchInput) => {
    e.preventDefault();
    fetch(
      // search results (10)
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${searchInput}&page_size=10&page=1&s_track_rating=desc&apikey=${apiKey}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          searchResults: data
        });
      });
  };
  render() {
    if (this.state.topTen) {
      return (
        <div>
          <Search
            handleInput={this.handleInput}
            handleSubmit={this.handleSubmit}
          />
          {this.state.searchResults ? (
            <SearchResults results={this.state.searchResults} />
          ) : null}

          <h1>Chart Toppers</h1>
          <Grid columns={3} divided>
            {this.state.topTen
              ? this.state.topTen.message.body.track_list.map(track => {
                  return (
                    <TopTracks track={track.track} key={track.track.track_id} />
                  );
                })
              : null}
          </Grid>
        </div>
      );
    } else {
      return null;
    }
  }
}
