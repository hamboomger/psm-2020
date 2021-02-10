import _ from 'lodash';
import React, {useEffect, useRef, useState} from "react";
import {Circle, Line} from "react-konva";
import Konva from "konva";
import {pendulum, Vector} from "../../lib/pendulumFunctions";
import {AppParametersStore, PendulumStore} from "../../lib/AppState";
import {precision} from "../../lib/util";
import {PSData, PSDSubscriberImpl} from "../../lib/PSDSubscriberImpl";
import {PhaseSpaceDataObservable} from "../../lib/PhaseSpaceDataObservable";

function startAnimation(newPendCoords: Vector, pivotCoords: Vector) {
  PendulumStore.update(s => {
    s.animationStarted = true;
    s.pendCoords = newPendCoords;
    const sLength = pendulum.getStringLength(pivotCoords, newPendCoords);
    const theta = pendulum.theta(pivotCoords, newPendCoords, 'rad');
    s.motionObservable = new PhaseSpaceDataObservable(theta, sLength);
  })
}

const Pendulum: React.FC = () => {
  const circleRef = useRef<Konva.Circle>(null);
  const lineRef = useRef<Konva.Line>(null);

  const {pivotCoords, pendCoords, animationStarted, motionObservable} = PendulumStore.useState();
  const [pendX, pendY] = [circleRef.current?.x() ?? pendCoords[0], circleRef.current?.y() ?? pendCoords[1]];
  const params = AppParametersStore.useState();

  const [konvaAnimation, setKonvaAnimation] = useState<Konva.Animation | undefined>();
  const [psdSub, setPSDSub] = useState<PSDSubscriberImpl>();
  const [psData, setPSData] = useState<PSData>();

  useEffect(() => {
    if (animationStarted && motionObservable) {
      const newPSDSub = new PSDSubscriberImpl(setPSData);
      setPSDSub(newPSDSub);
      motionObservable.subscribe(newPSDSub);
      PendulumStore.update(s => { s.subscribers++ });
      // motionObservable.startCalculations(params, 1000);
    }
  }, [animationStarted, motionObservable]);

  useEffect(() => {
    // console.log(`PSData keys: ${JSON.stringify(Object.keys(psData ?? {}))}`);
  }, [psData])

  useEffect(() => {
    if (animationStarted && psData && psdSub && !konvaAnimation) {
      const circle = circleRef.current!;
      const line = lineRef.current!;
      const konvaAnimation = new Konva.Animation((frame => {
        const {time, frameRate} = frame!;

        const roundedTime = _.round(time/100, precision(params.dt));
        const realPsData = psdSub.entireDataCache;
        if (!realPsData[roundedTime+'']) {
          console.log(`Can't find the rounded time of ${roundedTime}!`);
          console.log(`PSData # of keys: ${Object.keys(realPsData).length}`);
        } else {
          const [theta,] = realPsData[roundedTime+''];
          const sLength = pendulum.getStringLength(pivotCoords, pendCoords);
          const newCoords = pendulum.getCoords(pivotCoords, theta * 180 / Math.PI, sLength);
          circle.move({x: newCoords[0] - circle.x(), y: newCoords[1] - circle.y()});
          line.points([pivotCoords[0], pivotCoords[1], circle.x(), circle.y()]);
        }
      }));
      setKonvaAnimation(konvaAnimation);
      konvaAnimation.addLayer(circleRef.current?.getLayer());
      konvaAnimation.start();
    }
    if (!animationStarted && konvaAnimation) {
      konvaAnimation.stop();
      setKonvaAnimation(undefined);
    } else if (animationStarted && konvaAnimation) {
      konvaAnimation.start();
    }
  }, [animationStarted, konvaAnimation, psData, psdSub])
  return (
    <>
      <Line
        stroke="black"
        points={[pivotCoords[0], pivotCoords[1], pendX, pendY]}
        ref={lineRef}
      />
      <Circle
        stroke="black"
        strokeWidth={1}
        fill="#3af"
        x={pendX}
        y={pendY}
        radius={20}
        ref={circleRef}
        draggable={true}
        onDragMove={(e) => lineRef.current?.points([pivotCoords[0], pivotCoords[1], e.target.x(), e.target.y()])}
        onDragStart={() => PendulumStore.update(s => { s.animationStarted = false })}
        onDragEnd={(e) => startAnimation([e.target.x(), e.target.y()], pivotCoords)}
      />
    </>
  )
}

export default Pendulum;
