import React, {useEffect, useRef, useState} from "react";
import {PendulumStore} from "../../lib/AppState";
import {D3PlotBuilder} from "./D3PlotBuilder";
import {PSData, PSDSubscriberImpl} from "../../lib/PSDSubscriberImpl";

interface Props {
  width: number
  height: number
}

const PhaseSpacePlot: React.FC<Props> = ({width, height}) => {
  const svgRef = useRef(null);
  const {animationStarted, pendCoords, motionObservable} = PendulumStore.useState();
  const [plotBuilder, setPlotBuilder] = useState<D3PlotBuilder>();
  const [currentPatchData, setCurrentPatchData] = useState<PSData>();

  useEffect(() => {
    const newPlotBuilder = new D3PlotBuilder(width, height, svgRef.current!);
    newPlotBuilder.buildPlotPlane();
    setPlotBuilder(newPlotBuilder);
  }, [])
  useEffect(() => {
    if (animationStarted && motionObservable) {
      motionObservable.subscribe(new PSDSubscriberImpl(undefined, setCurrentPatchData));
      PendulumStore.update(s => {
        s.subscribers++
      });
    }
  }, [animationStarted, pendCoords, motionObservable]);
  useEffect(() => {
    if (animationStarted && currentPatchData && plotBuilder) {
      plotBuilder.drawPlotLine(currentPatchData);
    }
  }, [currentPatchData])
  return (
    <>
      <svg style={{width: '100%'}} ref={svgRef}/>
    </>
  )
}

export default PhaseSpacePlot
