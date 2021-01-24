import React from "react";
import {Button, Grid, IconButton, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {Container} from "typedi";
import {GameOfLiveService} from "../services/GameOfLiveService";
import {useActiveCells, useSetActiveCells} from "../AppContext";

export const DEFAULT_GRID_ROWS_NUMBER = 20
export const DEFAULT_GRID_COLUMNS_NUMBER = 30

const useStyles = makeStyles(() => ({
  root: {
    padding: 10,
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 250,
  },
  gridContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    alignContent: 'center',
    overflow: 'hidden',
  }
}));

interface Props {
  started: boolean,
  setStarted: (val: boolean) => void
}

const golService = Container.get(GameOfLiveService);
const GameSettings: React.FC<Props> = ({started, setStarted}) => {
  const activeCells = useActiveCells();
  const setActiveCells = useSetActiveCells();
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <form noValidate autoComplete="off">
        <Grid container className={classes.gridContainer}>
          <Grid item xs={4}>
            <Typography align="right">
              # of rows:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField id="rows"/>
          </Grid>
          <Grid item xs={2} className={classes.buttonContainer}>
            <IconButton color="primary" aria-label="Delete row">
              <RemoveIcon/>
            </IconButton>
          </Grid>
          <Grid item xs={2} className={classes.buttonContainer}>
            <IconButton color="primary" aria-label="Add row">
              <AddIcon/>
            </IconButton>
          </Grid>
        </Grid>
        <Button onClick={() => {
          if (!started) {
            setStarted(true);
            golService.resetToNewGame({
              rows: DEFAULT_GRID_ROWS_NUMBER,
              columns: DEFAULT_GRID_COLUMNS_NUMBER,
              activeCellsOnStart: activeCells
            });
          } else {
            setStarted(false)
          }
        }} variant="outlined">
          {started ? 'Stop' : 'Start'}
        </Button>
        <Button onClick={() => {
          setActiveCells(new Set());
        }}>
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default GameSettings;
