import {Store} from "pullstate";
import {config} from "./config";
import {PhaseSpaceParams} from "./pendulumFunctions";

export interface IPendulumStore {
  pivotCoords: [x: number, y: number]
  pendCoords: [x: number, y: number]
  animationStarted: boolean
  theta: (t: number) => [x: number, y: number]
}

export const PendulumStore = new Store<IPendulumStore>({
  animationStarted: false,
  pivotCoords: [window.innerWidth/4, 0],
  pendCoords: [window.innerWidth/4, 250],
  theta: () => [0, 0],
});

export const AppParametersStore = new Store<PhaseSpaceParams>({
  g: config.g,
  friction: config.friction,
  dt: config.dt,
  iterations: config.iterations
});
