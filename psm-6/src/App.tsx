import React, {useEffect} from 'react';
import './App.css';
import StartButton from "./components/StartButton";
import {AppParametersStore, PendulumStore} from "./lib/AppState";
import Pendulum from "./components/animation/Pendulum";
import PhaseSpacePlot from "./components/plot/PhaseSpacePlot";
import MotionSettings from "./components/settings/MotionSettings";

function App() {
  const { motionObservable: observable, subscribers } = PendulumStore.useState();
  const params = AppParametersStore.useState();
  useEffect(() => {
    if (observable && subscribers === 2) {
      observable.startCalculations(params, 1000);
      console.log('Calculations started')
    }
  }, [observable, subscribers])
  console.log(`window.innerWidth: ${window.innerWidth}`);
  return (
    <div className="App">
      <Pendulum height={window.innerHeight} width={window.innerWidth/2}/>
      <PhaseSpacePlot height={window.innerHeight} width={window.innerWidth/2} />
      <MotionSettings />
      <StartButton />
    </div>
  );
}

export default App;
