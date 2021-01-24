import React, {useEffect, useState} from 'react';
import 'reflect-metadata';
import {Box, makeStyles} from "@material-ui/core";
import GridContainer from "./components/GridContainer";
import GameSettings from "./components/GameSettings";
import {Container} from "typedi";
import {GameOfLiveService} from "./services/GameOfLiveService";
import {useSetActiveCells} from "./AppContext";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
  },
  paper: {
    height: 20,
    width: 20,
  },
}));
const golService = Container.get(GameOfLiveService);

function App() {
  const classes = useStyles();
  const setActiveCells = useSetActiveCells();
  const [started, setStarted] = useState(false);
  const [intervalRef, setIntervalRef] = useState<any>();

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => {
        const activeCells = golService.nextClock();
        setActiveCells(activeCells);
      }, 500)
      setIntervalRef(interval);
    } else if (!started && intervalRef){
      clearInterval(intervalRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  return (
    <>
      <Box className={classes.root}>
        <GridContainer/>
      </Box>
      <GameSettings started={started} setStarted={setStarted}/>
    </>
  );
}

export default App;
