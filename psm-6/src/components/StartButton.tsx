import {Fab, makeStyles} from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import React from "react";

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

interface Props {
  animationStarted: boolean,
  setAnimationStarted: (val: boolean) => void
}

const StartButton: React.FC<Props> = ({animationStarted, setAnimationStarted}) => {
  const classes = useStyles();

  return (
    <Fab onClick={() => {
      setAnimationStarted(!animationStarted);
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
