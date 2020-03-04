import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Heading } from "./components/heading";
import { Laps } from "./components/laps";
import { Clock, msToTime } from "./components/clock";
import { Buttons } from "./components/buttons";


let sets = null;

function Top() {

  const [state, setState] = useState({
    started: false,
    time: 0,
    lap: []
  });

  useEffect(() => {
    if (!state.started) {
      clearInterval(sets);
    }
  }, [state.started]);

  function lap() {
    if (!state.started) {
      return;
    }
    const timeArr = state.time;
    let lap_state = state.lap;
    lap_state.push(timeArr);
    setState({
      ...state,
      lap: lap_state
    });
  }

  function start() {
    if (state.started) {
      return;
    }
    setState({
      ...state,
      started: true
    });
    let current = state.time;
    let start = new Date() - current;
    sets = setInterval(() => {
      setState({
        ...state,
        started: true,
        time: new Date() - start
      });
    }, 1);
  }

  function clearIntervals() {
    setState({
      ...state,
      started: false
    });
    //    clearInterval(sets);
  }

  function resetAll() {
    setState({
      ...state,
      lap: [],
      time: 0
    });
    //fix this. this has to be run.
    //maybe we should use useEffect for setInterval
    //() => {this.clearIntervals();}
  }

  function makelaps() {
    let elem = state.lap.map(element => (
      <h3 key={state.lap.indexOf(element)}>{msToTime(element)}</h3>
    ));
    /* this.state.lap.forEach(element => {
      elem.push(
        <h3 key={this.state.lap.indexOf(element)}>{this.msToTime(element)}</h3>
      );
    }); */
    return elem;
  }

  function start_clear() {
    if (state.started) {
      clearIntervals();
    } else {
      start();
    }
  }

  function start_clearlap() {
    if (state.started) {
      lap();
    } else {
      resetAll();
    }
  }
  const laps = makelaps();
  return (
    <div className="main">
      <div className="head">
        <Heading />
        <Buttons
          started={state.started}
          start_clear={start_clear}
          start_clearlap={start_clearlap}
        />
        <Clock time={state.time} started={state.started} />
      </div>
      <Laps laps={laps} />
    </div>
  );
}

ReactDOM.render(<Top />, document.getElementById("root"));

//ReactDOM.render(<Hello />, document.getElementById("roo"));
/* function Hello(){
      const [count,setCount] = useState(0);
      return(
        <div>
          <button onClick={()=>setCount(count+1)}>
            clickk
          </button>
      <h3>count:{count}</h3>
        </div>
      )
    } */
