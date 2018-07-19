import React, { Component } from "react";
import logo from "./logo.svg";
import zupage from "zupage";
import "./App.css";
import Meme from "./meme.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Meme />
      </div>
    );
  }
}

export default App;
