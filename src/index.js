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
      started: false,
      h: 0,
      m: 0,
      s: 0,
      log: [],
    };
  }
  log(){
    const timeArr = [this.getH(),this.getM(),this.getS()];
    let log_state = this.state.log;
    if (log_state.indexOf(timeArr)>0) {return;}
    if (!this.state.started){return}
    log_state.push(timeArr); 
    this.setState({
      ...this.state,
      log : log_state,
    })
  }
  start() {
    if (this.state.started) {return}
    this.setState({
      ...this.state,
      started: true,
    })    
    this.seth = setInterval(() => {
      this.setState({
        ...this.state,
        h: 1 + this.state.h,
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
    this.setState({
      ...this.state,
      started: false,
    })
    clearInterval(this.seth);
    clearInterval(this.setm);
    clearInterval(this.sets);
  }
  resetAll() {
    this.setState({
      h: 0,
      m: 0,
      s: 0,
      log: [],
    }, () => {this.clearIntervals();});
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
  makeLogs(){
    let elem = [];
    this.state.log.forEach(element => {
      elem.push(
        <h3 key={this.state.log.indexOf(element)}>{element[0]}:{element[1]}:{element[2]}</h3>
      )
    });
    return elem;
  }
  start_stop(){
    return this.state.started ? "Stop": "Start";
  }
  start_clear(){
    if (this.state.started){
      this.clearIntervals.apply(this);
    } else {
      this.start.apply(this);
    }
  }
  render() {
    let logs = this.makeLogs.apply(this);
    return (
      <div className="main">
        <h2>Stopwatch {/* <span style={{fontSize:0.4+'em'}}>kindof</span> */}</h2>
        <div className="buttons">
          <button onClick={this.start_clear.bind(this)}>{this.start_stop.apply(this)}</button>
          <button onClick={this.resetAll.bind(this)}>Reset</button>
          <button className="logButton"
            onClick={this.log.bind(this)}
            >Log</button>
        </div><br></br>
        <h3>Hours : Minutes : Seconds</h3>
        <h3 className="clock">
          {this.getH.bind(this)()}:{this.getM.bind(this)()}:
          {this.getS.bind(this)()}
        </h3>
        <div className="logs">{logs}</div>
      </div>
    );
  }
}

ReactDOM.render(<Top />, document.getElementById("root"));
