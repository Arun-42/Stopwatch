import React from "react";

function Buttons({isStarted, toggleStart, doLapOrReset}) {
  return (
    <div className="buttons">
      <button onClick={toggleStart}>{isStarted ? "Stop" : "Start"}</button>
      <button className="second" onClick={doLapOrReset}>
        {isStarted ? "Lap" : "Reset"}
      </button>
    </div>
  );
}

export { Buttons };
