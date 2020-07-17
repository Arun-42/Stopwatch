import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Heading } from "./components/heading";
import { Laps } from "./components/laps";
import { Clock, msToTime } from "./components/clock";
import { Buttons } from "./components/buttons";

let interval = null;

function start(isStarted, setIsStarted, timeElapsed, setTime) {
  if (isStarted) {
    return;
  }
  setIsStarted(true);
  let current = timeElapsed;
  let pseudoStart = new Date() - current;
  interval = setInterval(() => {
    setTime(new Date() - pseudoStart);
  }, 1);
}

function createLapsComponent(laps) {
  let lapsJSX = laps.map(lap => (
    <h3 key={laps.indexOf(lap)}>{msToTime(lap)}</h3>
  ));
  return lapsJSX;
}

function doLap(isStarted, setLaps, timeElapsed, laps) {
  if (!isStarted) {
    return;
  }
  const timeArr = timeElapsed;
  let laps_state = laps;
  laps_state.push(timeArr);
  setLaps(laps_state);
}

function resetAll(setTimeElapsed, setLaps) {
  setTimeElapsed(0);
  setLaps([]);
}

function Top() {
  const [isStarted, setIsStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [laps, setLaps] = useState([]);
  const doStart = () => start(isStarted, setIsStarted, timeElapsed, setTimeElapsed);
  const doLapCopy = () => doLap(isStarted, setLaps, timeElapsed, laps);
  const doResetAll = () => resetAll(setTimeElapsed, setLaps);
  

  function toggleStart() {
    if (isStarted) {
      setIsStarted(false);
      clearInterval(interval)
    } else {
      doStart();
    }
  }

  function doLapOrReset() {
    if (isStarted) {
      doLapCopy();
    } else {
      doResetAll();
    }
  }
  const lapsComponent = createLapsComponent(laps);
  return (
    <div className="main">
      <div className="head">
        <Heading />
        <Buttons
          isStarted={isStarted}
          toggleStart={toggleStart}
          doLapOrReset={doLapOrReset}
        />
        <Clock timeElapsed={timeElapsed} isStarted={isStarted} />
      </div>
      <Laps laps={lapsComponent} />
    </div>
  );
}

ReactDOM.render(<Top />, document.getElementById("root"));
