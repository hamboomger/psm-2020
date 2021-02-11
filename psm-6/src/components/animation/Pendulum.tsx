import _ from 'lodash';
import React, {RefObject, useEffect, useRef, useState} from "react";
import {Circle, Layer, Line, Stage, Text} from "react-konva";
import Konva from "konva";
import {pendulum, Vector} from "../../lib/pendulumFunctions";
import {AppParametersStore, PendulumStore} from "../../lib/AppState";
import {DEGREE_UTF8_SYMBOL, DOT_THETA_UTF8_SYMBOL, precision, THETA_UTF8_SYMBOL} from "../../lib/util";
import {PSData, PSDSubscriberImpl} from "../../lib/PSDSubscriberImpl";
import {PhaseSpaceDataObservable} from "../../lib/PhaseSpaceDataObservable";

interface Props {
  width: number,
  height: number
}

function setLabels(
  thetaValue: number, thetaLblRef: RefObject<Konva.Text>,
  dotThetaValue?: number, dotThetaLblRef?: RefObject<Konva.Text>,
  angleType: 'deg' | 'rad' = 'deg'
) {
  const theta = _.round(angleType === 'deg' ? thetaValue : thetaValue * 180 / Math.PI, 2);
  thetaLblRef.current?.setText(`${THETA_UTF8_SYMBOL}: ${theta}${DEGREE_UTF8_SYMBOL}`);
  if (dotThetaValue && dotThetaLblRef) {
    const dotTheta = _.round(angleType === 'deg' ? dotThetaValue : dotThetaValue * 180 / Math.PI, 2);
    dotThetaLblRef.current?.setText(`${DOT_THETA_UTF8_SYMBOL}: ${dotTheta}${DEGREE_UTF8_SYMBOL}/s`);
  }
}

function startAnimation(newPendCoords: Vector, pivotCoords: Vector) {
  PendulumStore.update(s => {
    s.animationStarted = true;
    s.pendCoords = newPendCoords;
    const sLength = pendulum.getStringLength(pivotCoords, newPendCoords);
    const theta = pendulum.theta(pivotCoords, newPendCoords, 'rad');
    s.motionObservable = new PhaseSpaceDataObservable(theta, sLength);
  })
}

function updateElements(
  newPendCoords: Vector, pivotCoords: Vector,
  lineRef: RefObject<Konva.Line>, thetaLblRef: RefObject<Konva.Text>,
) {
  lineRef.current?.points([pivotCoords[0], pivotCoords[1], newPendCoords[0], newPendCoords[1]]);
  const theta = pendulum.theta(pivotCoords, newPendCoords, 'deg');
  setLabels(theta, thetaLblRef);
}

const Pendulum: React.FC<Props> = ({ width, height }) => {
  const circleRef = useRef<Konva.Circle>(null);
  const lineRef = useRef<Konva.Line>(null);
  const thetaLblRef = useRef<Konva.Text>(null);
  const dotThetaLblRef = useRef<Konva.Text>(null);

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
    }
  }, [animationStarted, motionObservable]);

  useEffect(() => {
    if (animationStarted && psData && psdSub && !konvaAnimation) {
      const circle = circleRef.current!;
      const line = lineRef.current!;
      const konvaAnimation = new Konva.Animation((frame => {
        const {time} = frame!;

        const roundedTime = _.round(time/100, precision(params.dt));
        const realPsData = psdSub.entireDataCache;
        if (!realPsData[roundedTime+'']) {
          console.log(`Can't find the rounded time of ${roundedTime}!`);
          console.log(`PSData # of keys: ${Object.keys(realPsData).length}`);
        } else {
          const [theta, dotTheta] = realPsData[roundedTime+''];
          const sLength = pendulum.getStringLength(pivotCoords, pendCoords);
          const newCoords = pendulum.getCoords(pivotCoords, theta * 180 / Math.PI, sLength);
          setLabels(theta, thetaLblRef, dotTheta, dotThetaLblRef, 'rad');
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
    <Stage width={width} height={height}>
      <Layer>
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
          onDragMove={(e) => updateElements([e.target.x(), e.target.y()], pivotCoords, lineRef, thetaLblRef)}
          onDragStart={() => PendulumStore.update(s => { s.animationStarted = false })}
          onDragEnd={(e) => startAnimation([e.target.x(), e.target.y()], pivotCoords)}
        />
        <Text
          x={width-200}
          y={20}
          text={`${THETA_UTF8_SYMBOL}: 0${DEGREE_UTF8_SYMBOL}`}
          fontSize={15}
          ref={thetaLblRef}
        />
        <Text
          x={width-200}
          y={40}
          text={`${DOT_THETA_UTF8_SYMBOL}: 0${DEGREE_UTF8_SYMBOL}/s`}
          fontFamily={'sans-serif'}
          fontSize={15}
          ref={dotThetaLblRef}
        />
      </Layer>
    </Stage>
  )
}

export default Pendulum;
