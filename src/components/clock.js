import React from "react";

function msToTime(s) {
  // Pad to 2 or 3 digits, default is 2
  return new Date(s).toISOString().slice(11, -1);
}

function Clock(props) {
  const clockstyle = {
    background: props.started
      ? "rgba(68, 64, 194, 0.2)"
      : props.time
      ? "rgba(226,44,100,0.4)"
      : "none"
  };

  return (
    <div className="clock" style={clockstyle}>
      <h3>{msToTime(props.time)}</h3>
    </div>
  );
}

export { Clock, msToTime };
