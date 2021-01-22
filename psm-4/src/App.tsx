import React from 'react';
import 'reflect-metadata';
import {Box, Grid, makeStyles, Paper} from "@material-ui/core";
import GridContainer from "./components/GridContainer";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
  },
  paper: {
    height: 20,
    width: 20,
  },
}));

function App() {
  const classes = useStyles();

  return (
      <Box className={classes.root}>
        <GridContainer />
      </Box>
  );
}

export default App;
