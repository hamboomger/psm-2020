import {Fab, makeStyles} from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import React from "react";
import {PendulumStore} from "../lib/AppState";

const useStyles = makeStyles((theme) => ({
  fabButton: {
    margin: theme.spacing(1),
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const StartButton: React.FC = () => {
  const { animationStarted, motionObservable } = PendulumStore.useState();
  const classes = useStyles();
  console.log(`animation started: ${animationStarted}`);

  return (
    <Fab onClick={() => {
      PendulumStore.update((s) => {
        s.animationStarted = !animationStarted
      });
      if (animationStarted) {
        motionObservable?.stopCalculations();
      }
    }}
         variant="extended"
         color="primary"
         aria-label="add"
         className={classes.fabButton}
    >
      {
        animationStarted ? (
          <>
            <PauseCircleOutlineIcon className={classes.extendedIcon}/>
            Pause
          </>
        ) : (
          <>
            <PlayCircleOutlineIcon className={classes.extendedIcon}/>
            Start
          </>
        )
      }
    </Fab>
  );
}

export default StartButton;
