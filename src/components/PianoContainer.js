import React from "react";
import ReactDOM from "react-dom";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import DimensionsProvider from "./DimensionsProvider";
import SoundfontProvider from "./SoundfontProvider";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
  first: MidiNumbers.fromNote("c3"),
  last: MidiNumbers.fromNote("c5")
};
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW
});

export default class PianoContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      octave: 4,
      currentNotes: [],
      sound: [],
      currentOscillatorsPlaying: []
    };
  }

  render(props) {
    return (
      <div>
        <DimensionsProvider>
          {({ containerWidth, containerHeight }) => (
            <SoundfontProvider
              instrumentName="acoustic_grand_piano"
              audioContext={audioContext}
              hostname={soundfontHostname}
              render={({ isLoading, playNote, stopNote }) => (
                <Piano
                  noteRange={noteRange}
                  width={containerWidth}
                  playNote={playNote}
                  stopNote={stopNote}
                  disabled={isLoading}
                  {...props}
                />
              )}
            />
          )}
        </DimensionsProvider>
      </div>
    );
  }
}
