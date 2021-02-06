import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.2),
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  },
}));

const arrayFromInteger = (range) => Array.from(Array(range).keys(), i => i);

export default function GridBoard() {
  const classes = useStyles();

  const rows = arrayFromInteger(5);
  const columns = arrayFromInteger(5);

  const board = {
    rows: rows,
    columns: columns
  }

  return (
    <div className={classes.root}>
      {rows.map(() => (
        <div className={classes.root}>
          {columns.map(() => (
            <Paper elevation={0} />
          ))}
        </div>
      ))}
    </div>
  );
}
