import _ from 'lodash'
import React from 'react';
import {Grid, makeStyles} from '@material-ui/core';
import GridCell from "./GridCell";
import {DEFAULT_GRID_COLUMNS_NUMBER, DEFAULT_GRID_ROWS_NUMBER} from "./GameSettings";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  }
}));

const GridContainer: React.FC = () => {
  const classes = useStyles();
  const makeRow = (row: number) => _.range(DEFAULT_GRID_COLUMNS_NUMBER).map(col => (
    <Grid key={col} item>
      <GridCell coords={`${row}.${col}`}/>
    </Grid>
  ));
  const rows = _.range(DEFAULT_GRID_ROWS_NUMBER).map(i => (
    <Grid key={i} item xs={12}>
      <Grid container justify="center" spacing={1}>
        {makeRow(i)}
      </Grid>
    </Grid>
  ))
  return (
    <Grid container className={classes.root} spacing={1}>
      {rows}
    </Grid>
  );
}

export default GridContainer;
