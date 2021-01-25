import _ from 'lodash'
import React from 'react';
import {Grid, makeStyles} from '@material-ui/core';
import GridCell from "./GridCell";
import {Dimensions} from "../App";

interface Props {
  dimensions: Dimensions
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  }
}));

const GridContainer: React.FC<Props> = ({ dimensions }) => {
  const classes = useStyles();
  const rows = _.range(dimensions.rows).map(row => {
    const columns = _.range(dimensions.cols).map(col => (
      <Grid key={col} item>
        <GridCell coords={`${row}.${col}`}/>
      </Grid>
    ));
    return (
      <Grid key={row} item xs={12}>
        <Grid container justify="center" spacing={1}>
          {columns}
        </Grid>
      </Grid>
    );
  });
  return (
    <Grid container className={classes.root} spacing={1}>
      {rows}
    </Grid>
  );
}

export default GridContainer;
