import React, { Component } from "react";
import Markdown from 'react-markdown';
import md from '../../assets/operationGuide/operation-guide.md';


class OperationGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: ''
    };
  }
 
  componentWillMount() {
    fetch(md)
      .then(res => res.text())
      .then(text => this.setState({ markdown: text }));
  }


  render() {
 
    return (
      <Markdown source={this.state.markdown} />
    );
  }
}

export default OperationGuide;
