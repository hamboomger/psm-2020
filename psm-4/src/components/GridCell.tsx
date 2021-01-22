import React from "react";
import {Grid, makeStyles, Paper} from "@material-ui/core";

interface Props {
  isActive: boolean
}

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 20,
    width: 20,
    transition: theme.transitions.create(["background", "background-color"], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      background: "#d9d9d9",
    },
  },
  active: {
    background: theme.palette.secondary.main
  }
}));

const GridCell: React.FC<Props> = ({ isActive }) => {
  const classes = useStyles();

  const cellClasses = isActive ? `${classes.paper} ${classes.active}` : `${classes.paper}`
  return <Paper className={cellClasses}/>
}

export default GridCell;
