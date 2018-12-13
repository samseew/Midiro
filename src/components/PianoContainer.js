import React from "react";
import { KeyboardShortcuts } from "react-piano";
import "react-piano/dist/styles.css";
import song from "../song/peppa pig john cena what music are you into.mp3";
import DimensionsProvider from "./DimensionsProvider";
import SoundfontProvider from "./SoundfontProvider";
import { Button, Icon, Dropdown } from "semantic-ui-react";
import jsonData from "../data.json";
import "../piano.css";
import PianoRecord from "./PianoRecord.js";
import Metronome from "./Metronome.js";
import Konami from "react-konami-code";
import SongsContainer from "./SongsContainer.js";

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
    this.brunoSong = new Audio(song);
    this.state = {
      octave: 2, // current octave, no less than 0, no more than 5
      noteRange: {
        first: 48,
        last: 65
      },
      easterEgg: false,
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
    //create the keyboard shortcuts
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
    // listener for octave changes
    document.addEventListener("keyup", this.documentListener, false);
  }

  documentListener = e => {
    // change the octave
    if (e.key === "v" || e.key === "V") {
      this.downOctave();
    } else if (e.key === "n" || e.key === "N") {
      this.upOctave();
    } else {
    }
  };

  componentWillUnmount() {
    // unmounts listener
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
    // when we load a new sound, reset the keyboard
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

  handleSecret = () => {
    this.brunoSong.play();
    this.setState({
      easterEgg: true
    });
  };

  secret() {
    // easter egg
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <ul />
        <ul />
        <ul />
        <ul />
        <ul />
        <ul /> <ul />
        <ul />
        <ul />
        <ul />
        <ul />
        <ul />
        <ul />
        <ul />
        <ul />
        <ul />
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>lMAO</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <img src={require("../bruno-cena.gif")} alt="" />
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND LMAO ENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
        <ul>AND HIS NAME IS JOHN CENA</ul>
      </div>
    );
  }

  render(props) {
    return (
      <div>
        <Konami action={this.handleSecret} code={[66, 82, 85, 78, 79]} />

        <Button
          size="small"
          icon="arrow alternate circle left outline"
          labelPosition="left"
          content="Down an Octave (V)"
          onClick={this.downOctave.bind(this)}
        />
        <Dropdown
          onChange={this.changeSound}
          value={this.state.instrumentName}
          selection
          options={menuOptions}
        />
        <Button
          size="small"
          icon="arrow alternate circle right outline"
          labelPosition="right"
          content="Up an Octave (N)"
          onClick={this.upOctave.bind(this)}
        />
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
                saveRecording,
                listenToRecording
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
                  listenToRecording={listenToRecording}
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
        <br />
        <div />
        {this.state.easterEgg ? this.secret() : null}
      </div>
    );
  }
}
