import _ from 'lodash';
import {Service} from "typedi";

type Coord = [number, number]

export interface GameConfig {
  rows: number,
  columns: number,
  activeCellsOnStart: Set<string>
}

@Service()
export class GameOfLiveService {
  private config: GameConfig;
  private activeCells: Set<string>
  constructor() {
    this.config = { rows: 0, columns:0, activeCellsOnStart: new Set() }  // default config is not used in the future
    this.activeCells = new Set();
  }
  private calculateNeighbors(x: number, y: number): number {
    const neighboringCells: Coord[] = [
      [x-1, y+1], [x, y+1], [x+1, y+1],
      [x-1, y],             [x+1, y],
      [x-1, y-1], [x, y-1], [x+1, y-1],
    ];
    return neighboringCells.filter(c => {
      const entry = `${c[0]}.${c[1]}`
      return this.activeCells.has(entry)
    }).length
  }
  resetToNewGame(config: GameConfig) {
    this.config = config;
    this.activeCells = config.activeCellsOnStart;
  }
  nextClock(): Set<string> {
    console.log(`Before: ${Array.from(this.activeCells)}`);
    const updatedActiveCells = new Set<string>();
    for (let x of _.range(this.config.rows)) {
      for (let y of _.range(this.config.columns)) {
        const nOfLiveNeighbors = this.calculateNeighbors(x, y);
        const cellEntry = `${x}.${y}`;
        if (nOfLiveNeighbors === 3 || (nOfLiveNeighbors === 2 && this.activeCells.has(cellEntry))) {
          updatedActiveCells.add(cellEntry);
        }
      }
    }
    this.activeCells = updatedActiveCells;
    return updatedActiveCells;
  }

}
