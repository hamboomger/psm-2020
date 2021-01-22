import _ from 'lodash'
import React from 'react';
import {Grid, makeStyles, Paper} from '@material-ui/core';
import GridCell from "./GridCell";

const GRID_ROWS_NUMBER = 30
const GRID_COLUMNS_NUMBER = 40

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  }
}));

const GridContainer: React.FC = () => {
  const classes = useStyles();
  const makeRow = () => _.range(GRID_COLUMNS_NUMBER).map(i => (
    <Grid key={i} item>
      <GridCell isActive={true} />
    </Grid>
  ));
  const rows = _.range(GRID_ROWS_NUMBER).map(i => (
    <Grid key={i} item xs={12}>
      <Grid container justify="center" spacing={1}>
        {makeRow()}
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
