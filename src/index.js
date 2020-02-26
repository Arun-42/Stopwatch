import React from "react";
import ReactDOM from "react-dom";
import "./index.css"
import {Heading} from "./components/heading"
import  {Laps} from "./components/laps"
import {Clock, msToTime} from "./components/clock"
import {Buttons} from "./components/buttons"


class Top extends React.Component {
  constructor(props) {
    super(props);
    this.sets = null;
    this.start_clear = this.start_clear.bind(this);
    this.start_clearlap = this.start_clearlap.bind(this);
    this.state = {
      started: false,
      time: 0,
      lap: []
    };
  }

  lap() {
    if (!this.state.started) {
      return;
    }
    const timeArr = this.state.time;
    let lap_state = this.state.lap;
    lap_state.push(timeArr);
    this.setState({
      lap: lap_state
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
        lap: [],
        time: 0
      },
      () => {
        this.clearIntervals();
      }
    );
  }
  makelaps() {
    let elem = this.state.lap.map(element => (
      <h3 key={this.state.lap.indexOf(element)}>{msToTime(element)}</h3>
    ));
    /* this.state.lap.forEach(element => {
      elem.push(
        <h3 key={this.state.lap.indexOf(element)}>{this.msToTime(element)}</h3>
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
  start_clearlap() {
    if (this.state.started) {
      this.lap.apply(this);
    } else {
      this.resetAll.apply(this);
    }
  }
  render() {
    const laps = this.makelaps.apply(this);
    //const started = this.state.started;

    return (
      <div className="main">
        <div className="head">
          <Heading />
          <Buttons
            started={this.state.started}
            start_clear={this.start_clear}
            start_clearlap={this.start_clearlap}
          />
          <Clock 
            time={this.state.time} 
            started={this.state.started} 
          />
        </div>
        <Laps laps={laps} />
      </div>
    );
  }
}



ReactDOM.render(<Top />, document.getElementById("root"));
