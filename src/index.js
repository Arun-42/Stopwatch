import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Heading } from "./components/heading";
import { Laps } from "./components/laps";
import { Clock, msToTime } from "./components/clock";
import { Buttons } from "./components/buttons";

let interval = null;

function start(started, setStarted, time, setTime) {
  if (started) {
    return;
  }
  setStarted(true);
  let current = time;
  let start = new Date() - current;
  interval = setInterval(() => {
    setTime(new Date() - start);
  }, 1);
}

function makelaps(lap) {
  let elem = lap.map(element => (
    <h3 key={lap.indexOf(element)}>{msToTime(element)}</h3>
  ));
  return elem;
}

function lapfunc(started, setLap, time, lap) {
  if (!started) {
    return;
  }
  const timeArr = time;
  let lap_state = lap;
  lap_state.push(timeArr);
  setLap(lap_state);
}

function resetAll(setTime, setLap) {
  setTime(0);
  setLap([]);
}

function Top() {
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [lap, setLap] = useState([]);
  const doStart = () => start(started, setStarted, time, setTime);
  const doLapfunc = () => lapfunc(started, setLap, time, lap);
  const doResetAll = () => resetAll(setTime, setLap);
  
  useEffect(() => {
    if (!started) {
      clearInterval(interval);
    }
  }, [started]);

  function start_clear() {
    if (started) {
      setStarted(false);
    } else {
      doStart();
    }
  }

  function start_clearlap() {
    if (started) {
      doLapfunc();
    } else {
      doResetAll();
    }
  }

  const laps = makelaps(lap);
  return (
    <div className="main">
      <div className="head">
        <Heading />
        <Buttons
          started={started}
          start_clear={start_clear}
          start_clearlap={start_clearlap}
        />
        <Clock time={time} started={started} />
      </div>
      <Laps laps={laps} />
    </div>
  );
}

ReactDOM.render(<Top />, document.getElementById("root"));
