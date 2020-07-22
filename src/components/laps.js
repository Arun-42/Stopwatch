import React from "react";

function Laps({laps}) {
  const lapsComponent = <div className="laps">{laps.reverse()}</div>; 
  return lapsComponent;
}

export { Laps };
