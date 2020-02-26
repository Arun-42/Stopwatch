import React from "react"

function Laps(props) {
  return <div className="laps">{props.laps.reverse()}</div>;
}

export {Laps}