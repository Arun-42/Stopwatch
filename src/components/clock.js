import React from "react";

function msToTime(s) {
  // Pad to 2 or 3 digits, default is 2
  return new Date(s).toISOString().slice(11, -1);
}

function Clock({timeElapsed, isStarted}) {
  const clockstyle = {
    background: isStarted
      ? "white"
      : timeElapsed
      ? "black"
      : "none",
    color: isStarted
    ? "black"
    : timeElapsed
    ? "white"
    : "black",
  };

  return (
    <div className="clock" style={clockstyle}>
      <h3>{msToTime(timeElapsed)}</h3>
    </div>
  );
}

export { Clock, msToTime };
