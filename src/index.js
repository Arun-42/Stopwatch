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
      s: 0
    };
  }
  start() {
    this.seth = setInterval(() => {
      this.setState({
        ...this.state,
        h: 1 + this.state.h
      });
    }, 1000 * 60 * 60);
    this.setm = setInterval(() => {
      this.setState({
        ...this.state,
        m: 1 + this.state.m
      });
    }, 1000 * 60);
    this.sets = setInterval(() => {
      this.setState({
        ...this.state,
        s: 1 + this.state.s
      });
      if (this.state.s >= 60) {
        this.setState({
          ...this.state,
          s: 0
        });
      }
      if (this.state.m >= 60) {
        this.setState({
          ...this.state,
          m: 0
        });
      }
    }, 1000);
  }
  clearIntervals() {
    clearInterval(this.seth);
    clearInterval(this.setm);
    clearInterval(this.sets);
  }
  resetAll() {
    this.setState({
      h: 0,
      m: 0,
      s: 0
    });
    this.clearIntervals.bind(this)();
  }
  getS() {
    return this.state.s < 10 ? "0" + String(this.state.s) : String(this.state.s);
  }
  getM() {
    return this.state.m < 10 ? "0" + String(this.state.m) : String(this.state.m);
  }
  getH() {
    return this.state.h < 10 ? "0" + String(this.state.h) : String(this.state.h);
  }
  render() {
    return (
      <div>
        <h1>Stopwatch <span style={{fontSize:0.4+'em'}}>kindof</span></h1>
        <div className="buttons">
          <button onClick={this.start.bind(this)}>Start</button>
          <button onClick={this.clearIntervals.bind(this)}>Stop</button>
          <button onClick={this.resetAll.bind(this)}>Reset</button>
        </div>
        <h3>
          {this.getH.bind(this)()}:{this.getM.bind(this)()}:
          {this.getS.bind(this)()}
        </h3>
      </div>
    );
  }
}

ReactDOM.render(<Top />, document.getElementById("root"));
