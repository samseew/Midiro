import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default class NavBar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Menu>
          <Menu.Menu>
            <Menu.Item>
              <NavLink to="/">Home</NavLink>
            </Menu.Item>

            <Menu.Item>
              <NavLink to="/findlyrics">Find Lyrics</NavLink>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </React.Fragment>
    );
  }
}
