import React, {useState} from 'react';
import './App.css';
import Pendulum from "./components/Pendulum";
import {Layer, Stage} from "react-konva";
import StartButton from "./components/StartButton";
import Plot from "./components/Plot";
import {PendulumStore} from "./lib/AppState";

function App() {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [thetaRad, setThetaRad] = useState(0);
  return (
    <div className="App">
      <Stage width={window.innerWidth / 2} height={window.innerHeight}>
        <Layer>
          <Pendulum
            animationStarted={animationStarted}
            setAnimationStarted={setAnimationStarted}
          />
        </Layer>
      </Stage>
      <Plot animationStarted={animationStarted} plotHeight={window.innerHeight / 2}
            plotWidth={Math.min(window.innerWidth / 2, 800)}/>
      <StartButton animationStarted={animationStarted} setAnimationStarted={setAnimationStarted}/>
    </div>
  );
}

export default App;
