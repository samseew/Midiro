import React from "react";
import PianoContainer from "./PianoContainer.js";
import { Route, Switch } from "react-router-dom";
import SongsContainer from "./SongsContainer.js";
import Error from "./Error.js";
export default class PageContainer extends React.Component {
  render() {
    return (
      <div>
        Page Container:
        <Switch>
          <Route exact path="/" component={PianoContainer} />
          <Route path="/songs" component={SongsContainer} />
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}
