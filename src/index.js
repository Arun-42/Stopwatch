import React, { Component } from "react";
import ReactDOM from "react-dom";
require("./index.css");

// this is super clumpsy on second thought

function start_stop(started) {
  return started ? "Stop" : "Start";
}

function start_stoplog(started) {
  return started ? "Lap" : "Reset";
}

function Buttons(props) {
  const started = props.started;
  return (
    <div className="buttons">
      <button onClick={props.start_clear}>{start_stop(started)}</button>
      <button onClick={props.start_clearlog}>{start_stoplog(started)}</button>
    </div>
  );
}

class Top extends React.Component {
  constructor(props) {
    super(props);
    this.sets = null;
    this.start_clear = this.start_clear.bind(this);
    this.start_clearlog = this.start_clearlog.bind(this);
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
      log: log_state
    });
  }

  start() {
    if (this.state.started) {
      return;
    }
    this.setState({
      started: true
    });
    let current = this.state.time;
    let start = new Date() - current;
    this.sets = setInterval(() => {
      this.setState({
        time: new Date() - start
      });
    }, 1);
  }
  clearIntervals() {
    this.setState({
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
    let elem = this.state.log.map(element => (
      <h3 key={this.state.log.indexOf(element)}>{this.msToTime(element)}</h3>
    ));
    /* this.state.log.forEach(element => {
      elem.push(
        <h3 key={this.state.log.indexOf(element)}>{this.msToTime(element)}</h3>
      );
    }); */
    return elem;
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
  render() {
    let logs = this.makeLogs.apply(this);
    //const started = this.state.started;
    const clockstyle = {
      background: this.state.started
        ? "rgba(68, 64, 194, 0.2)"
        : this.state.time
        ? "rgba(226,44,100,0.4)"
        : "none"
    };
    return (
      <div className="main">
        <h2>
          Stopwatch {/* <span style={{fontSize:0.4+'em'}}>kindof</span> */}
        </h2>
        <Buttons
          started={this.state.started}
          start_clear={this.start_clear}
          start_clearlog={this.start_clearlog}
        />
        <br></br>
        {/* <h3>Hours : Minutes : Seconds</h3> */}
        <div className="clock" style={clockstyle}>
          <h3>{this.msToTime(this.state.time)}</h3>
        </div>
        <div className="logs">{logs.reverse()}</div>
      </div>
    );
  }
}

ReactDOM.render(<Top />, document.getElementById("root"));
