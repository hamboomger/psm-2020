import React from "react";
import {Button, Grid, IconButton, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {Container} from "typedi";
import {GameOfLiveService} from "../services/GameOfLiveService";
import {useActiveCells, useSetActiveCells} from "../AppContext";
import {Dimensions} from "../App";


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
  dimensions: Dimensions
  setDimensions: (dimensions: Dimensions) => void
}

const golService = Container.get(GameOfLiveService);
const GameSettings: React.FC<Props> = ({started, setStarted, dimensions, setDimensions}) => {
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
            <TextField id="rows" value={dimensions.rows} disabled/>
          </Grid>
          <Grid item xs={2} className={classes.buttonContainer}>
            <IconButton onClick={() => {
              setDimensions({
                ...dimensions,
                rows: dimensions.rows - 5,
              })
            }} color="primary" aria-label="Delete row">
              <RemoveIcon/>
            </IconButton>
          </Grid>
          <Grid item xs={2} className={classes.buttonContainer}>
            <IconButton onClick={() => {
              setDimensions({
                ...dimensions,
                rows: dimensions.rows + 5,
              })
            }} color="primary" aria-label="Add row">
              <AddIcon/>
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <Typography align="right">
              # of cols:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField id="cols" value={dimensions.cols} disabled/>
          </Grid>
          <Grid item xs={2} className={classes.buttonContainer}>
            <IconButton onClick={() => {
              setDimensions({
                ...dimensions,
                cols: dimensions.cols - 5,
              })
            }} color="primary" aria-label="Delete row">
              <RemoveIcon/>
            </IconButton>
          </Grid>
          <Grid item xs={2} className={classes.buttonContainer}>
            <IconButton onClick={() => {
              setDimensions({
                ...dimensions,
                cols: dimensions.cols + 5,
              })
            }} color="primary" aria-label="Add row">
              <AddIcon/>
            </IconButton>
          </Grid>
        </Grid>
        <Button onClick={() => {
          if (!started) {
            setStarted(true);
            golService.resetToNewGame({
              rows: dimensions.rows,
              columns: dimensions.cols,
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
