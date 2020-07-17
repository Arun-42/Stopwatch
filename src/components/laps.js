import React from "react";

function Laps({laps}) {
  return <div className="laps">{laps.reverse()}</div>;
}

export { Laps };
