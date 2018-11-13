import React from "react";
import SongList from "./SongList.js";
export default class SongsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      User: [],
      Songs: []
    };
  }

  handleDelete = id => {
    console.log("deleted");
    fetch(`http://localhost:6969/songs/${id}`, {
      method: "DELETE"
    }).then(() => {
      let updated = this.state.Songs.filter(song => song.id !== id);
      this.setState({
        Songs: updated
      });
    });
  };

  componentDidMount() {
    fetch("http://localhost:6969/users/1")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          User: data,
          Songs: data.songs
        });
      });
  }
  render() {
    if (this.state.User) {
      return (
        <div>
          <SongList
            user={this.state.User}
            songs={this.state.Songs}
            handleDelete={this.handleDelete}
            listenToRecording={this.props.listenToRecording}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}
