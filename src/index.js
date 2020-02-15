import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Top extends React.Component {
  constructor(props) {
    super(props);
    this.seth = null;
    this.setm = null;
    this.sets = null;
    this.setms = null;
    this.state = {
      h: 0,
      m: 0,
      s: 0,
      ms: 0
    };
  }
  start() {
    this.seth = setInterval(() => {
      this.setState({
        ...this.state,
        h: 1 + this.state.h,
      });
    }, 1000 * 60 * 60);
    this.setm = setInterval(() => {
      this.setState({
        ...this.state,
        m: 1 + this.state.m,
      });
    }, 1000 * 60);
    this.sets = setInterval(() => {
      this.setState({
        ...this.state,
        s: 1 + this.state.s,
      });
    }, 1000);
    this.setms = setInterval(() => {
      this.setState({
        ...this.state,
        ms: 1 + this.state.ms,
      });
    }, 1);
  }
  clearIntervals() {
    clearInterval(this.seth);
    clearInterval(this.setm);
    clearInterval(this.sets);
    clearInterval(this.setms);
  }
  resetAll(){
    this.setState({
      h: 0,
      m: 0,
      s: 0,
      ms: 0
    });
    this.clearIntervals.bind(this)();
  }
  render() {
    return (
      <div>
        <h1>Heading</h1>
        <div className="buttons">
          <button onClick={this.start.bind(this)}>Start</button>
          <button onClick={this.clearIntervals.bind(this)}>Stop</button>
          <button onClick={this.resetAll.bind(this)}>Reset</button>
        </div>
        <h3>{this.state.h}:{this.state.m}:{this.state.s}:{this.state.ms}</h3>
      </div>
    );
  }
}

ReactDOM.render(<Top />, document.getElementById("root"));
