import React from "react";
import PianoContainer from "./PianoContainer.js";
import { Route, Switch } from "react-router-dom";
import SongsContainer from "./SongsContainer.js";
import Error from "./Error.js";
import LyricsContainer from "./LyricsContainer.js";
import Lyrics from "./Lyrics.js";
import SearchResults from "./SearchResults.js";
export default class PageContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      mySongs: []
    };
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={PianoContainer} />
          <Route path="/songs" component={SongsContainer} />
          <Route path="/findlyrics" component={LyricsContainer} />
          <Route exact path="/lyrics/track/:id" component={Lyrics} />
          <Route exact path="/SearchResults" component={SearchResults} />
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}
