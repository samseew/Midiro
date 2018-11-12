import React from "react";
import { KeyboardShortcuts } from "react-piano";
import "react-piano/dist/styles.css";

import DimensionsProvider from "./DimensionsProvider";
import SoundfontProvider from "./SoundfontProvider";
import { Button, Icon, Dropdown } from "semantic-ui-react";
import jsonData from "../data.json";
import "../piano.css";
import PianoRecord from "./PianoRecord.js";
import Metronome from "./Metronome.js";

const titleize = require("titleize");
const menuOptions = jsonData.map(el => {
  let sound = titleize(el.split("_").join(" "));
  let soundEl = { value: el, text: sound };
  return soundEl;
});

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

export default class PianoContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      octave: 2, // no less than 0, no more than 5
      noteRange: {
        first: 48,
        last: 65
      },
      recordingEvents: [],
      instrumentName: "acoustic_grand_piano",
      recordingStatus: null,
      recording: {
        mode: null,
        events: [],
        currentTime: 0,
        currentEvents: []
      },
      recordColor: null
    };
    this.scheduledEvents = [];
  }

  keyboardShortcuts() {
    let lowerCaseShortCuts = KeyboardShortcuts.create({
      firstNote: this.state.noteRange.first,
      lastNote: this.state.noteRange.last,
      keyboardConfig: KeyboardShortcuts.HOME_ROW
    });
    let upperCaseShortcuts = [...lowerCaseShortCuts].map(el => {
      return { key: el.key.toUpperCase(), midiNumber: el.midiNumber };
    });
    return lowerCaseShortCuts.concat(upperCaseShortcuts);
  }

  componentDidMount() {
    document.addEventListener("keyup", this.documentListener, false);
  }

  documentListener = e => {
    if (e.key === "v" || e.key === "V") {
      this.downOctave();
    } else if (e.key === "n" || e.key === "N") {
      this.upOctave();
    } else {
    }
  };

  componentWillUnmount() {
    document.removeEventListener("keyup", this.documentListener, false);
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
      octave: 2, // no less than 0, no more than 5
      noteRange: {
        first: 48,
        last: 65
      },
      instrumentName: sound.value
    });
  };
  startRecording = () => {
    console.log("starting to record");
    // let copy = [...this.state.recording];
    // copy.mode = "RECORDING";
    if (this.state.recordColor === null) {
      this.setState({
        recordColor: "red",
        recordingStatus: "RECORDING"
      });
    } else {
      this.setState({
        recordColor: null,
        recordingStatus: "STOP"
      });
    }
  };

  clearRecording = () => {
    console.log("clearing recording");
    this.setState({
      recordingStatus: "CLEAR",
      recordColor: null
    });
  };

  stopRecording = () => {
    console.log("stopping recording");
    this.setState({
      recordingStatus: "STOP",
      recordColor: null
    });
  };

  playRecording = () => {
    console.log("playing recoridng");
  };

  saveRecording = () => {
    console.log("saving record");
  };
  render(props) {
    return (
      <div>
        <Button icon labelPosition="left" onClick={this.downOctave.bind(this)}>
          <Icon name="left arrow" />
          Down an Octave (V)
        </Button>
        <Dropdown
          onChange={this.changeSound}
          value={this.state.instrumentName}
          selection
          options={menuOptions}
        />
        <Button icon labelPosition="right" onClick={this.upOctave.bind(this)}>
          Up an Octave (N) <Icon name="right arrow" />
        </Button>
        <Metronome />
        <DimensionsProvider>
          {({ containerWidth, containerHeight }) => (
            <SoundfontProvider
              instrumentName={this.state.instrumentName}
              soundfont={"MusyngKite"}
              audioContext={audioContext}
              hostname={soundfontHostname}
              playRecording={this.playRecording}
              stopRecording={this.stopRecording}
              startRecording={this.startRecording}
              saveRecording={this.saveRecording}
              clearRecording={this.clearRecording}
              recordingStatus={this.state.recordingStatus}
              render={({
                isLoading,
                playNote,
                stopNote,
                playRecording,
                clearRecording,
                startRecording,
                saveRecording
              }) => (
                <PianoRecord
                  recordColor={this.state.recordColor}
                  startRecording={startRecording}
                  saveRecording={saveRecording}
                  clearRecording={clearRecording}
                  playRecording={playRecording}
                  stopRecording={this.stopRecording}
                  recording={this.state.recording}
                  setRecording={this.setRecording}
                  noteRange={this.state.noteRange}
                  width={containerWidth}
                  playNote={playNote}
                  stopNote={stopNote}
                  disabled={isLoading}
                  keyboardShortcuts={this.keyboardShortcuts()}
                  {...props}
                />
              )}
            />
          )}
        </DimensionsProvider>
        <div />
      </div>
    );
  }
}
