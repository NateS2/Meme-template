import React, { Component } from "react";
import { Image } from "semantic-ui-react";

class MemePhoto extends Component {
  state = { body: "", images: [], url: "" };

  componentWillReceiveProps(newProps) {
    console.log("New Props", newProps);
    this.setState({ body: newProps.body, images: newProps.images });
    this.formatURL();
  }

  formatURL = () => {
    const { body, images } = this.state;
    // https://memegen.link/buzz/memes/memes_everywhere // can add .jpg at end
    // use this first to test
    var url = "https://memegen.link/buzz/memes/memes_everywhere.jpg";
    this.setState({ url: url });
  };

  render() {
    return <Image src={this.state.url} />;
  }
}

export default MemePhoto;
