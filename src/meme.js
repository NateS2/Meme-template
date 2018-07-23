import React, { Component } from "react";
import { Image } from "semantic-ui-react";

class MemePhoto extends Component {
  state = {
    body: "",
    images: [],
    url: "",
    topLine: "_",
    bottomLine: "_"
  };

  componentDidMount() {
    console.log("component mounted");
    // this.formatURL();
  }

  async componentWillReceiveProps(newProps) {
    console.log("New Props", newProps);
    await this.setState({ body: newProps.body, images: newProps.images });
    this.createParagraphs();
    this.formatURL();
  }

  createParagraphs = () => {
    const { body } = this.state;
    if (body === null || body === "") {
      var paragraphBody = "";
    } else {
      var paragraphBody = body.split(/[\r\n\t]+/gm);
    }
    console.log("paragraphBody", paragraphBody);

    if (paragraphBody.length > 0) {
      if (paragraphBody.length === 1) {
        paragraphBody = this.splitter(this.trimString(paragraphBody[0], 140));
      }

      this.setState({
        topLine: this.trimString(paragraphBody[0], 70),
        bottomLine: this.trimString(paragraphBody[1], 70)
      });
    }

    this.setState({ paragraphs: paragraphBody });
  };

  trimString = (string, maxLength) => {
    // maximum number of characters to extract
    var string = string + " ";
    var maxLength = maxLength;
    //trim the string to the maximum length
    var trimmedString = string.substr(0, maxLength);
    //re-trim if we are in the middle of a word
    return (trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    ));
  };

  splitter = s => {
    var middle = Math.floor(s.length / 2);
    var before = s.lastIndexOf(" ", middle);
    var after = s.indexOf(" ", middle + 1);

    if (before == -1 || (after != -1 && middle - before >= after - middle)) {
      middle = after;
    } else {
      middle = before;
    }

    var s1 = s.substr(0, middle);
    var s2 = s.substr(middle + 1);

    return [s1, s2];
  };

  formatURL = () => {
    const { body, images, topLine, bottomLine } = this.state;
    var imageURL = "";
    if (images[0] != undefined && images[0] != null) {
      imageURL = images[0].url;
    }
    // https://memegen.link/buzz/memes/memes_everywhere // can add .jpg at end
    // use this first to test
    //  https://memegen.link/custom/my_pretty/background.jpg?alt=http://www.gstatic.com/webp/gallery/1.jpg
    var mutableTopLine = topLine;
    var mutableBottomLine = bottomLine;
    mutableTopLine = mutableTopLine.replace(new RegExp("\\?", "g"), "~q");
    mutableBottomLine = mutableBottomLine.replace(new RegExp("\\?", "g"), "~q");
    mutableTopLine = mutableTopLine.replace(new RegExp("\\%", "g"), "~p");
    mutableBottomLine = mutableBottomLine.replace(new RegExp("\\%", "g"), "~p");
    mutableTopLine = mutableTopLine.replace(new RegExp("\\#", "g"), "~h");
    mutableBottomLine = mutableBottomLine.replace(new RegExp("\\#", "g"), "~h");
    mutableTopLine = mutableTopLine.replace(new RegExp("\\/", "g"), "~s");
    mutableBottomLine = mutableBottomLine.replace(new RegExp("\\/", "g"), "~s");
    console.log("mutable", mutableTopLine);
    var url =
      " https://memegen.link/custom/" +
      mutableTopLine +
      "/" +
      mutableBottomLine +
      ".jpg?alt=" +
      imageURL;
    console.log("url", url);
    this.setState({ url: url });
  };

  render() {
    return <Image src={this.state.url} />;
  }
}

export default MemePhoto;
