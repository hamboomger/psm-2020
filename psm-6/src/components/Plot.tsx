import React, {useEffect, useState} from "react";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";
import {AppParametersStore, PendulumStore} from "../lib/AppState";
import {pendulum, PhaseSpace} from "../lib/pendulumFunctions";

interface Props {
  plotHeight: number,
  plotWidth: number,
}

function phaseSpaceToData(phaseSpace: PhaseSpace): { x: number, y: number, value: number }[] {
  return phaseSpace.map(ps => {
    const [, coord,] = ps;
    return { x: coord[0], y: coord[1], value: 1};
  });
}

const Plot: React.FC<Props> = ({ plotHeight, plotWidth }) => {
  const { animationStarted, pendCoords, pivotCoords } = PendulumStore.useState();
  const params = AppParametersStore.useState();
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    if (animationStarted) {
      const theta = pendulum.theta(pivotCoords, pendCoords, 'rad');
      const L = pendulum.getStringLength(pivotCoords, pendCoords);
      const phaseSpace = pendulum.phaseSpace(theta, L, params);
      const newData = phaseSpaceToData(phaseSpace);
      setData(newData);
    }
  }, [animationStarted, pendCoords]);

  console.log('Animation started: ' + animationStarted);
  return (
    <div id="phaseSpaceChart">
      <LineChart width={plotWidth} height={plotHeight} data={data}>
        <XAxis dataKey="x" label={'&#775;θ'}/>
        <YAxis dataKey="y" label={'θ'}/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" points={data} stroke="#8884d8" />
      </LineChart>
    </div>
  )
}

export default Plot;
