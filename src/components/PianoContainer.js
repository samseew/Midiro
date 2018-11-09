import React from "react";
import ReactDOM from "react-dom";
import { KeyboardShortcuts } from "react-piano";
import "react-piano/dist/styles.css";

import DimensionsProvider from "./DimensionsProvider";
import SoundfontProvider from "./SoundfontProvider";
import { Button, Icon, Dropdown } from "semantic-ui-react";
import jsonData from "../data.json";
import "../piano.css";
import MusicRecorder from "./MusicRecorder.js";
import _ from "lodash";
import PianoRecord from "./PianoRecord.js";

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
      instrumentName: "acoustic_grand_piano",
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

  getRecordingEndTime = () => {
    if (this.state.recording.events.length === 0) {
      return 0;
    }
    return Math.max(
      ...this.state.recording.events.map(event => event.time + event.duration)
    );
  };

  setRecording = value => {
    this.setState({
      recording: Object.assign({}, this.state.recording, value)
    });
  };

  onClickPlay = () => {
    this.setRecording({
      mode: "PLAYING"
    });

    const startAndEndTimes = _.uniq(
      _.flatMap(this.state.recording.events, event => [
        event.time,
        event.time + event.duration
      ])
    );
    startAndEndTimes.forEach(time => {
      this.scheduledEvents.push(
        setTimeout(() => {
          const currentEvents = this.state.recording.events.filter(event => {
            return event.time <= time && event.time + event.duration > time;
          });
          this.setRecording({
            currentEvents
          });
        }, time * 1000)
      );
    });
    // Stop at the end
    setTimeout(() => {
      this.onClickStop();
    }, this.getRecordingEndTime() * 1000);
  };

  onClickStop = () => {
    this.scheduledEvents.forEach(scheduledEvent => {
      clearTimeout(scheduledEvent);
    });
    this.setRecording({
      mode: "RECORDING",
      currentEvents: []
    });
  };

  onClickClear = () => {
    this.onClickStop();
    this.setRecording({
      events: [],
      mode: "RECORDING",
      currentEvents: [],
      currentTime: 0
    });
  };

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
    // let copy = [...this.state.recording];
    // copy.mode = "RECORDING";
    console.log("start");
    if (this.state.recordColor === null) {
      this.setState({
        recordColor: "red"
      });
    } else {
      this.setState({
        recordColor: null
      });
    }
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
        <DimensionsProvider>
          {({ containerWidth, containerHeight }) => (
            <SoundfontProvider
              instrumentName={this.state.instrumentName}
              soundfont={"MusyngKite"}
              audioContext={audioContext}
              hostname={soundfontHostname}
              render={({ isLoading, playNote, stopNote }) => (
                <PianoRecord
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
        <div>
          <MusicRecorder
            record={this.startRecording.bind(this)}
            play={this.onClickPlay}
            stop={this.onClickStop}
            clear={this.onClickClear}
            recordColor={this.state.recordColor}
          />
        </div>
      </div>
    );
  }
}

// 18 keys counting first and last
// const noteRange = {
//   first: 48,
//   last: 65
// };
// const lowerCaseShortCuts = KeyboardShortcuts.create({
//   firstNote: 65,
//   lastNote: 82,
//   keyboardConfig: KeyboardShortcuts.HOME_ROW
// });
//
// const upperCaseShortcuts = [...lowerCaseShortCuts].map(el => {
//   return { key: el.key.toUpperCase(), midiNumber: el.midiNumber };
// });
