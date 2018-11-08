import React from "react";
import Oscillator from "./Oscillator.js";

export default class PianoContainer extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
  }
  render() {
    return (
      <div>
        <Oscillator />
      </div>
    );
  }
}
