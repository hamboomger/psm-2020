import {Store} from "pullstate";

interface IPendulumStore {
  pivotCoords: [x: number, y: number]
  pendCoords: [x: number, y: number]
  animationStarted: boolean
  theta: (t: number) => [x: number, y: number]
}

export const PendulumStore = new Store<IPendulumStore>({
  animationStarted: false,
  pivotCoords: [250, 250],
  pendCoords: [350, 450],
  theta: () => [0, 0],
});


