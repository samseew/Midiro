import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar.js";
import PageContainer from "./components/PageContainer.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <PageContainer />
      </div>
    );
  }
}

export default App;
