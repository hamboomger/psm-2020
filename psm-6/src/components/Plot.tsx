import React from "react";
import {CartesianGrid, LineChart, XAxis, YAxis} from "recharts";

interface Props {
  plotHeight: number,
  plotWidth: number,
  animationStarted: boolean,
}

const Plot: React.FC<Props> = ({ plotHeight, plotWidth, animationStarted }) => {
  console.log('Animation started: ' + animationStarted);
  return (
    <LineChart width={plotWidth} height={plotHeight}>
      <CartesianGrid />
      <XAxis label={'Velocity'}/>
      <YAxis label={'Position'}/>
    </LineChart>
  )
}

export default Plot;
