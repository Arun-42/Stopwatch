import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Top extends React.Component {
  constructor(props) {
    super(props);
    this.sets = null;
    this.state = {
      started: false,
      time: 0,
      log: []
    };
  }
  msToTime(s) {
    // Pad to 2 or 3 digits, default is 2
    return new Date(s).toISOString().slice(11, -1);
  }

  log() {
    if (!this.state.started) {
      return;
    }
    const timeArr = this.state.time;
    let log_state = this.state.log;
    log_state.push(timeArr);
    this.setState({
      ...this.state,
      log: log_state
    });
  }
  start() {
    if (this.state.started) {
      return;
    }
    this.setState({
      ...this.state,
      started: true
    });
    let current = this.state.time;
    let start = new Date() - current;
    this.sets = setInterval(() => {
      this.setState({
        ...this.state,
        time: new Date() - start
      });
    }, 1);
  }
  clearIntervals() {
    this.setState({
      ...this.state,
      started: false
    });
    clearInterval(this.sets);
  }
  resetAll() {
    this.setState(
      {
        log: [],
        time: 0
      },
      () => {
        this.clearIntervals();
      }
    );
  }
  makeLogs() {
    let elem = [];
    this.state.log.forEach(element => {
      elem.push(
        <h3 key={this.state.log.indexOf(element)}>{this.msToTime(element)}</h3>
      );
    });
    return elem;
  }
  start_stop() {
    return this.state.started ? "Stop" : "Start";
  }
  start_clear() {
    if (this.state.started) {
      this.clearIntervals.apply(this);
    } else {
      this.start.apply(this);
    }
  }
  start_clearlog() {
    if (this.state.started) {
      this.log.apply(this);
    } else {
      this.resetAll.apply(this);
    }
  }
  start_stoplog() {
    return this.state.started ? "Log" : "Reset";
  }
  render() {
    let logs = this.makeLogs.apply(this);
    return (
      <div className="main">
        <h2>
          Stopwatch {/* <span style={{fontSize:0.4+'em'}}>kindof</span> */}
        </h2>
        <div className="buttons">
          <button onClick={this.start_clear.bind(this)}>
            {this.start_stop.apply(this)}
          </button>
          <button onClick={this.start_clearlog.bind(this)}>
            {this.start_stoplog.apply(this)}
          </button>
        </div>
        <br></br>
        <h3>Hours : Minutes : Seconds</h3>
        <div className="clock">
          <h3>{this.msToTime(this.state.time)}</h3>
        </div>
        <div className="logs">{logs.reverse()}</div>
      </div>
    );
  }
}

ReactDOM.render(<Top />, document.getElementById("root"));
