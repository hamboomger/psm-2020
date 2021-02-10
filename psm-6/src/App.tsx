import React, {useEffect} from 'react';
import './App.css';
import Pendulum from "./components/animation/Pendulum";
import {Layer, Stage} from "react-konva";
import StartButton from "./components/StartButton";
import PhaseSpacePlot from "./components/plot/PhaseSpacePlot";
import {AppParametersStore, PendulumStore} from "./lib/AppState";

function App() {
  const { motionObservable: observable, subscribers } = PendulumStore.useState();
  const params = AppParametersStore.useState();
  useEffect(() => {
    if (observable && subscribers === 2) {
      observable.startCalculations(params, 1000);
      console.log('Calculations started')
    }
  }, [observable, subscribers])
  return (
    <div className="App">
      <Stage width={window.innerWidth / 2} height={window.innerHeight}>
        <Layer>
          <Pendulum />
        </Layer>
      </Stage>
      <PhaseSpacePlot height={window.innerHeight} width={window.innerWidth/2} />
      <StartButton />
    </div>
  );
}

export default App;
