import React from "react";
import SongList from "./SongList.js";
export default class SongsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      User: []
    };
  }

  handleDelete = id => {
    console.log("deleted");
    fetch(`http://localhost:6969/songs/${id}`, {
      method: "DELETE"
    }).then(
      this.setState({
        User: this.state.User
      })
    );
  };

  componentDidMount() {
    fetch("http://localhost:6969/users/1")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          User: data
        });
      });
  }
  render() {
    if (this.state.User) {
      return (
        <div>
          <SongList user={this.state.User} handleDelete={this.handleDelete} />
        </div>
      );
    } else {
      return null;
    }
  }
}
