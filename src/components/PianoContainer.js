import React from "react";
import ReactDOM from "react-dom";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import DimensionsProvider from "./DimensionsProvider";
import SoundfontProvider from "./SoundfontProvider";
import { Button, Icon, Dropdown } from "semantic-ui-react";
import jsonData from "../data.json";

const titleize = require("titleize");
const menuOptions = jsonData.map(el => {
  let sound = titleize(el.split("_").join(" "));
  let lol = { value: el, text: sound };
  return lol;
});

console.log(menuOptions);
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

// 18 keys counting first and last
// const noteRange = {
//   first: 48,
//   last: 65
// };
// const keyboardShortcuts = KeyboardShortcuts.create({
//   firstNote: 65,
//   lastNote: 82,
//   keyboardConfig: KeyboardShortcuts.HOME_ROW
// });

export default class PianoContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      octave: 2, // no less than 0, no more than 5
      noteRange: {
        first: 48,
        last: 65
      },
      instrumentName: "acoustic_grand_piano"
    };
  }
  downOctave = () => {
    if (this.state.octave === 0) {
    } else {
      this.setState({
        octave: this.state.octave - 1,
        noteRange: {
          first: this.state.noteRange.first - 17,
          last: this.state.noteRange.last - 17
        }
      });
    }
  };
  upOctave = () => {
    if (this.state.octave === 5) {
    } else {
      this.setState({
        octave: this.state.octave + 1,
        noteRange: {
          first: this.state.noteRange.first + 17,
          last: this.state.noteRange.last + 17
        }
      });
    }
  };
  changeSound = event => {
    let sound = menuOptions.find(el => event.target.textContent === el.text);
    this.setState({
      instrumentName: sound.value
    });
  };

  render(props) {
    return (
      <div>
        <Dropdown
          onChange={this.changeSound}
          value={this.state.instrumentName}
          selection
          options={menuOptions}
        />
        <DimensionsProvider>
          {({ containerWidth, containerHeight }) => (
            <SoundfontProvider
              instrumentName={this.state.instrumentName}
              soundfont={"MusyngKite"}
              audioContext={audioContext}
              hostname={soundfontHostname}
              render={({ isLoading, playNote, stopNote }) => (
                <Piano
                  noteRange={this.state.noteRange}
                  width={containerWidth}
                  playNote={playNote}
                  stopNote={stopNote}
                  disabled={isLoading}
                  keyboardShortcuts={KeyboardShortcuts.create({
                    firstNote: this.state.noteRange.first,
                    lastNote: this.state.noteRange.last,
                    keyboardConfig: KeyboardShortcuts.HOME_ROW
                  })}
                  {...props}
                />
              )}
            />
          )}
        </DimensionsProvider>
        <Button icon labelPosition="left" onClick={this.downOctave.bind(this)}>
          <Icon name="left arrow" />
          Down an Octave
        </Button>
        <Button icon labelPosition="right" onClick={this.upOctave.bind(this)}>
          Up an Octave <Icon name="right arrow" />
        </Button>
        <Button.Group horizontal labeled icon>
          <Button icon="record" content="record" />
          <Button icon="stop" content="stop" />
          <Button icon="play" content="play" />
        </Button.Group>
      </div>
    );
  }
}
