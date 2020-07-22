import React from "react";

function Laps({laps}) {
  const lapsComponent = laps.length ? <div className="laps laps-top-border">{laps.reverse()}</div> : <div className="laps">{laps.reverse()}</div>; 
  return lapsComponent;
}

export { Laps };
