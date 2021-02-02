import React, {useEffect, useRef, useState} from "react";
import {AppParametersStore, PendulumStore} from "../../lib/AppState";
import {pendulum, PhaseSpaceParams, Vector} from "../../lib/pendulumFunctions";
import {buildD3Plot, PlotData} from "./d3Plot";

interface Props {
  width: number
  height: number
}

function getPhaseSpaceData(pivotCoords: Vector, pendCoords: Vector, params: PhaseSpaceParams): PlotData {
  const theta = pendulum.theta(pivotCoords, pendCoords, 'rad');
  const L = pendulum.getStringLength(pivotCoords, pendCoords);
  const phaseSpace = pendulum.phaseSpace(theta, L, params);
  return phaseSpace.map(ps => {
    const [t, coord,] = ps;
    return { t, theta: coord[0], dotTheta: coord[1] };
  });
}

const PhaseSpacePlot: React.FC<Props> = ({ width, height}) => {
  const svgRef = useRef(null);
  const { animationStarted, pendCoords, pivotCoords } = PendulumStore.useState();
  const params = AppParametersStore.useState();
  const [, setData] = useState<any[]>([]);
  useEffect(() => {
    if (animationStarted) {
      const newData = getPhaseSpaceData(pivotCoords, pendCoords, params);

      buildD3Plot(newData, svgRef.current!, width, height);
      setData(newData);
    }
  }, [animationStarted, pendCoords]);
  return (
    <>
      <svg style={{ width: '100%'}} ref={svgRef}/>
    </>
  )
}

export default PhaseSpacePlot
