import React from "react";
import {makeStyles, Paper} from "@material-ui/core";
import {useActiveCells, useSetActiveCells, useUpdateCell} from "../AppContext";

interface Props {
  coords: string
}

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 25,
    width: 25,
    transition: theme.transitions.create(["background", "background-color"], {
      duration: theme.transitions.duration.short,
    }),
  },
  paperHover: {
    '&:hover': {
      background: "#d9d9d9",
    },
  },
  active: {
    background: theme.palette.secondary.main
  }
}));

const GridCell: React.FC<Props> = ({ coords }) => {
  const classes = useStyles();
  const activeCells = useActiveCells();
  const setActive = useUpdateCell();
  const setActiveCells = useSetActiveCells();

  const isActive = activeCells.has(coords);
  const cellClasses = isActive ? `${classes.paper} ${classes.active}` : `${classes.paper} ${classes.paperHover}`
  return <Paper onClick={() => {
    setActiveCells(new Set<string>(['1.4']))
    setActive(coords, !isActive)
  }} className={cellClasses}/>
}

export default GridCell;
