import React from "react";

export default class Oscillator extends React.Component {
  constructor() {
    super();
    this.state = {
      currentOscillator: []
    };
  }

  componentDidMount() {
    const context = new AudioContext();
    const oscillator = context.createOscillator();

    //to connect, start and stop(must be disconnected when it stops )
    oscillator.connect(context.destination);
    // oscillator.start(0);
    // oscillator.stop(0);
    // oscillator.disconnect(0);

    //gives volume to audio  and connects to destination
    // const gain = context.createGain();
    // gain.connect(context.destination);
    // oscillator.start(0);
    // gain.volume.value = 1;
    // gain.volume.value = 0; //muted
    var Note = require("octavian").Note;

    let note1 = new Note("A4");
    //frequency value
    oscillator.frequency.value = note1.frequency;

    //type of waves
    oscillator.type = "sine";
    this.setState({
      currentOscillator: oscillator
    });
  }

  render() {
    return null;
  }
}
