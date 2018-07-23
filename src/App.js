import React, { Component } from "react";
import logo from "./logo.svg";
import zupage from "zupage";
import "./App.css";
import MemePhoto from "./meme.js";

class App extends Component {
  state = { post: { body: "", images: [], page: {} } };

  async componentDidMount() {
    // const post = await zupage.getPost('4122d340-7bdb-4996-8400-f3d582d84280');
    const post = await zupage.getCurrentPost();
    this.setState({ post });
    // console.log("Response!", post);
  }

  render() {
    const { images, body, title, page } = this.state.post;

    return (
      <div className="background">
        <div className="App">
          <MemePhoto body={body} images={images} />
        </div>
      </div>
    );
  }
}

export default App;
