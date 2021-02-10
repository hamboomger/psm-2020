import _ from 'lodash';
import React, {useEffect, useRef, useState} from "react";
import {Circle, Line} from "react-konva";
import Konva from "konva";
import {pendulum, PhaseSpace, Vector} from "../../lib/pendulumFunctions";
import {AppParametersStore, PendulumStore} from "../../lib/AppState";
import {PhaseSpaceDataObservable, PSDSubscriber} from "../plot/PhaseSpaceDataObservable";
import {precision} from "../../lib/util";


function setAnimationStarted(animationStarted: boolean) {
  PendulumStore.update(s => {
    s.animationStarted = animationStarted;
  });
}

const Pendulum: React.FC = () => {
  const circleRef = useRef<Konva.Circle>(null);
  const lineRef = useRef<Konva.Line>(null);

  const {pivotCoords, pendCoords, animationStarted, motionObservable} = PendulumStore.useState();
  const params = AppParametersStore.useState();
  const [anim, setKonvaAnimation] = useState<Konva.Animation | undefined>();
  const [pivotX, pivotY] = pivotCoords;
  const [pendX, pendY] = [circleRef.current?.x() ?? pendCoords[0], circleRef.current?.y() ?? pendCoords[1]];
  const [phaseSpaceSub, setPhaseSpaceSub] = useState<PSDSubscriber>()
  const [PSData, setPSData] = useState<{ [t: string]: [theta: number, dotTheta: number]}>();

  useEffect(() => {
    if (animationStarted && motionObservable && !phaseSpaceSub) {
      const sub: PSDSubscriber = {
        notify(patchNumber: number, phaseSpace: PhaseSpace) {
          const newPSData = _.chain(phaseSpace)
            .groupBy(elem => elem[0])
            .mapValues(elem => elem[0][1])
            .assign(PSData)
            .value();
          console.log(`psData: ${JSON.stringify(newPSData)}`);
          setPSData(newPSData);
        }
      };
      motionObservable.subscribe(sub);
      motionObservable.startCalculations(params, 300);
      setPhaseSpaceSub(sub);
    }
  }, [animationStarted, motionObservable]);

  useEffect(() => {
    if (animationStarted && !anim && PSData) {
      const circle = circleRef.current!;
      const line = lineRef.current!;
      const realTime = Date.now();
      const konvaAnimation = new Konva.Animation((frame => {
        const {time, frameRate} = frame!;
        console.log(`time: ${time / 100}`);
        console.log(`real time: ${(Date.now() - realTime) / 100}`);
        console.log(`fps: ${frameRate}`)

        const roundedTime = _.round(time/100, precision(params.dt));
        if (!PSData[roundedTime+'']) {
          console.log(`Can't find the rounded time of ${roundedTime}!`);
          console.log(`PSData keys: ${Object.keys(PSData)}`);
        } else {
          const [theta, dotTheta] = PSData[roundedTime+''];
          const sLength = pendulum.getStringLength(pivotCoords, pendCoords);
          const newCoords = pendulum.getCoords(pivotCoords, theta * 180 / Math.PI, sLength);
          circle.move({x: newCoords[0] - circle.x(), y: newCoords[1] - circle.y()});
          line.points([pivotX, pivotY, circle.x(), circle.y()]);
        }
      }));
      setKonvaAnimation(konvaAnimation);
      konvaAnimation.addLayer(circleRef.current?.getLayer());
      konvaAnimation.start();
    }
    if (!animationStarted && anim) {
      anim.stop();
      setKonvaAnimation(undefined);
    } else if (animationStarted && anim) {
      anim.start();
    }
  }, [animationStarted, anim, PSData])
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
            const sLength = pendulum.getStringLength(pivotCoords, pendCoords);
            const theta = pendulum.theta(pivotCoords, [e.target.x(), e.target.y()], 'rad');
            s.motionObservable = new PhaseSpaceDataObservable(theta, sLength);
          })
        }}
      />
    </>
  )
}

export default Pendulum;
