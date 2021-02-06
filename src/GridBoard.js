import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",    
    '& > *': {
      margin: theme.spacing(0.2),
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  },
}));

const arrayFromInteger = (range) => Array.from(Array(range).keys(), i => i);

const createEmpty2DArray = (height, width) => {
  let data = [];
  for (let i = 0; i < height; i++) {
    data.push([]);
    for (let j = 0; j < width; j++) {
      data[i][j] = {
        x: i,
        y: j,
        isBotHere: false,
      };
    }
  }
  return data;
}

export default function GridBoard() {
  const classes = useStyles();

  const rows = arrayFromInteger(5);
  const columns = arrayFromInteger(5);

  return (
    <div className={classes.root}>
      {rows.map((row) => (
        <Grid>
          {columns.map((col) => (
            <Paper id={"row_"+col+"_col_"+row} variant="outlined" align="center" square />
            ))}
        </Grid>
      ))}
    </div>
  );
}
