import React from "react"


function start_stop(started) {
  return started ? "Stop" : "Start";
}

function start_stoplap(started) {
  return started ? "Lap" : "Reset";
}


function Buttons(props) {
  const started = props.started;
  return (
    <div className="buttons">
      <button onClick={props.start_clear}>{start_stop(started)}</button>
      <button className="second" onClick={props.start_clearlap}>
        {start_stoplap(started)}
      </button>
    </div>
  );
}

export {Buttons}