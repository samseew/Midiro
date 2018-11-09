import React from "react";
import { Button } from "semantic-ui-react";

export default class MusicRecorder extends React.Component {
  render() {
    return (
      <Button.Group labeled icon>
        <Button
          onClick={this.props.record}
          color={this.props.recordColor}
          icon="record"
          content="record"
        />
        <Button onClick={this.props.stop} icon="stop" content="stop" />
        <Button onClick={this.props.play} icon="play" content="play" />
      </Button.Group>
    );
  }
}
