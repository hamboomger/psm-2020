import React, {useEffect, useState} from 'react';
import 'reflect-metadata';
import {Box, makeStyles} from "@material-ui/core";
import GridContainer from "./components/GridContainer";
import GameSettings from "./components/GameSettings";
import {Container} from "typedi";
import {GameOfLiveService} from "./services/GameOfLiveService";
import {useSetActiveCells} from "./AppContext";

export const DEFAULT_GRID_ROWS_NUMBER = 20
export const DEFAULT_GRID_COLUMNS_NUMBER = 30

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
  },
  paper: {
    height: 20,
    width: 20,
  },
}));

export interface Dimensions {
  cols: number,
  rows: number,
}

const golService = Container.get(GameOfLiveService);

function App() {
  const classes = useStyles();
  const setActiveCells = useSetActiveCells();
  const [started, setStarted] = useState(false);
  const [intervalRef, setIntervalRef] = useState<any>();
  const [dimensions, setDimensions] = useState<Dimensions>({
    cols: DEFAULT_GRID_COLUMNS_NUMBER,
    rows: DEFAULT_GRID_ROWS_NUMBER
  });

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => {
        const activeCells = golService.nextClock();
        setActiveCells(activeCells);
      }, 200)
      setIntervalRef(interval);
    } else if (!started && intervalRef){
      clearInterval(intervalRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  return (
    <>
      <Box className={classes.root}>
        <GridContainer dimensions={dimensions}/>
      </Box>
      <GameSettings
        started={started}
        setStarted={setStarted}
        dimensions={dimensions}
        setDimensions={setDimensions}
      />
    </>
  );
}

export default App;
