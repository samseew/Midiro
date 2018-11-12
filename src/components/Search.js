import React from "react";
import { Button, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      trackTitle: ""
    };
  }
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <form
          action=""
          onSubmit={e => this.props.handleSubmit(e, this.state.trackTitle)}
        >
          <Input
            onChange={this.handleInput}
            type="text"
            placeholder="Song Title..."
            name="trackTitle"
            value={this.state.trackTitle}
          />
          <Button type="submit">
            <Link to="/SearchResults">Search</Link>
          </Button>
        </form>
      </div>
    );
  }
}
