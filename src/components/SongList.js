import React from "react";
import { Button } from "semantic-ui-react";
export default class SongList extends React.Component {
  render() {
    if (this.props.user.first_name) {
      return (
        <div>
          <p>Hello {this.props.user.first_name}, here are your songs:</p>
          {this.props.user.songs.map(song => (
            <div>
              <p>
                {this.props.user.songs.indexOf(song) + 1}:{song.name}
                <Button onClick="">Listen</Button>
                <Button onClick={() => this.props.handleDelete(song.id)}>
                  Delete
                </Button>
              </p>
            </div>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}
