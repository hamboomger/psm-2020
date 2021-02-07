import React, {useEffect, useRef, useState} from "react";
import {Circle, Line} from "react-konva";
import Konva from "konva";
import {pendulum} from "../lib/pendulumFunctions";
import {PendulumStore} from "../lib/AppState";
import {PSDSubscriber} from "./plotting/PhaseSpaceDataObservable";

function setAnimationStarted(animationStarted: boolean) {
  PendulumStore.update(s => {
    s.animationStarted = animationStarted;
  });
}

const Pendulum: React.FC = () => {
  const circleRef = useRef<Konva.Circle>(null);
  const lineRef = useRef<Konva.Line>(null);

  const { pivotCoords, pendCoords, animationStarted } = PendulumStore.useState();
  const [anim, setAnim] = useState<Konva.Animation | undefined>();
  const [pivotX, pivotY] = pivotCoords;
  const [pendX, pendY] = [circleRef.current?.x() ?? pendCoords[0], circleRef.current?.y() ?? pendCoords[1]];
  const [phaseSpaceSub, setPhaseSpaceSub] = useState<PSDSubscriber>()

  useEffect(() => {
    if (animationStarted && !anim) {
      const sLength = pendulum.getStringLength(pivotCoords, [pendX, pendY]);
      const angle = pendulum.theta(pivotCoords, [pendX, pendY], 'deg');
      const thetaFun = pendulum.thetaFunction(angle*(Math.PI/180), sLength);
      const circle = circleRef.current!;
      const line = lineRef.current!;
      const realTime = Date.now();
      const anim = new Konva.Animation((frame => {
        const { time, frameRate } = frame!;
        console.log(`time: ${time/1000}`);
        console.log(`real time: ${(Date.now() - realTime)/1000}`);
        console.log(`fps: ${frameRate}`)
        const newAngle = thetaFun(time/100);
        const newCoords = pendulum.getCoords(pivotCoords, newAngle, sLength);
        circle.move({ x: newCoords[0] - circle.x(), y: newCoords[1] - circle.y() });
        line.points([pivotX, pivotY, circle.x(), circle.y()]);
      }));
      setAnim(anim);
      anim.addLayer(circleRef.current?.getLayer());
      anim.start();
    }
    if (!animationStarted && anim) {
      anim.stop();
      setAnim(undefined);
    } else if (animationStarted && anim) {
      anim.start();
    }
  }, [animationStarted, anim])
  return (
    <>
      <Line
        stroke="black"
        points={[pivotX, pivotY, circleRef.current?.x() ?? pendX, circleRef.current?.y() ?? pendY]}
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
        onDragMove={(e) => lineRef.current?.points([pivotX, pivotY, e.target.x(), e.target.y()])}
        onDragStart={() => setAnimationStarted(false)}
        onDragEnd={(e) => {
          PendulumStore.update(s => {
            s.animationStarted = true;
            s.pendCoords = [e.target.x(), e.target.y()];
          })
        }}
      />
    </>
  )
}

export default Pendulum;
