import React from 'react';
import './App.css';
import Pendulum from "./components/Pendulum";
import {Layer, Stage} from "react-konva";
import StartButton from "./components/StartButton";
import PhaseSpacePlot from "./components/plotting/PhaseSpacePlot";
import {AppParametersStore, PendulumStore} from "./lib/AppState";

function App() {
  const params = AppParametersStore.useState();
  const pendInfo = PendulumStore.useState();
  return (
    <div className="App">
      <Stage width={window.innerWidth / 2} height={window.innerHeight}>
        <Layer>
          <Pendulum />
        </Layer>
      </Stage>
      <PhaseSpacePlot height={window.innerHeight} width={window.innerWidth/2} params={params} pendInfo={pendInfo}/>
      <StartButton />
    </div>
  );
}

export default App;
