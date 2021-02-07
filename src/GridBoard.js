import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask';
// import { ArrowUpwardIcon } from '@material-ui/icons/ArrowUpward';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.2),
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    height: 70,
    width: 70,
    textAlign: 'center',
    justifyContent: "center"
  },  
}));

const PlaceInput = ({ inputRef, ...props }) => (
  <MaskedInput
    {...props}
    ref={ref => {
      inputRef(ref ? ref.inputElement : null);
    }}
    mask={[
      /[0-4]/,
      ',',
      /[0-4]/,
      ',',
      /[A-Z]/,
      /[A-Z]/,
      /[A-Z]/,
      /[A-Z]/,
      /[A-Z]/,
    ]}
    placeholderChar={'\u2000'}
  />
);

/**
 * main function
 */

export default function GridBoard() {
  const classes = useStyles();
  const [placeCommand, setPlaceCommand] = useState();
  const [currentGrid, setCurrentGrid] = useState({});
  const [isRobotOnGrid, setIsRobotOnGrid] = useState(false);

  useEffect(() => {
    console.log('currentGrid: ', currentGrid);
    reportRobot();
  }, [currentGrid]);  

  const maxRows = 4;
  const maxCols = 4;
  const rows = [4,3,2,1,0];
  const columns = [0,1,2,3,4];

  const faceNorth = 'NORTH';
  const faceEast = 'EAST';
  const faceWest = 'WEST';
  const faceSouth = 'SOUTH';
  const mapFace = {
    'NORTH': { 
      arrow: '^', 
      icon: 'ArrowUpwardIcon',
      left: 'WEST:<', 
      right: 'EAST:>' 
    },
    'EAST': { 
      arrow: '>', 
      icon: 'ArrowForwardIcon',
      left: 'NORTH:^', 
      right: 'SOUTH:V' 
    },
    'WEST': { 
      arrow: '<', 
      icon: 'ArrowBackIcon',
      left: 'SOUTH:V', 
      right: 'NORTH:^' 
    },
    'SOUTH': { 
      arrow: 'V', 
      icon: 'ArrowDownwardIcon',
      left: 'EAST:>', 
      right: 'WEST:<' 
    },
  }

  const keyFace = Object.keys(mapFace);

  const displayRobot = (gridId, arrow, icon) => {
    // const html = '<' + icon + ' />'
    const html = '<b>' + arrow + '</b>';
    document.getElementById(gridId).innerHTML = html;
  }

  const hideRobot = () => {
    let {x, y, facing, arrow, icon} = currentGrid;
    let gridId = 'x_' + x + '_y_' + y;
    document.getElementById(gridId).innerHTML = '';
  }

  const placeRobot = () => {
    let [x,y,f] = placeCommand.trim().split(',');
    if (!keyFace.includes(f)) {
      // TODO: show error toast
      return false;
    }

    if (isRobotOnGrid) {
      hideRobot();
    }

    // set the grid
    const arrow = mapFace[f].arrow;
    const icon = mapFace[f].icon;
    const gridId = 'x_' + x + '_y_' + y;
    setCurrentGrid({
      x: x,
      y: y,
      facing: f,
      arrow: arrow,
      icon: icon
    });

    displayRobot(gridId, arrow, icon);

    // enable the succeeding commands (move, left, right)
    setIsRobotOnGrid(true);
  }

  const moveRobot = () => {
    let {x, y, facing, arrow, icon} = currentGrid;
    let currentGridId = 'x_' + x + '_y_' + y;

    switch (facing) {
      case faceNorth: {
        if (++y > maxRows) {
          return false; // do nothing
        }
        break;
      }
      case faceSouth: {
        if (--y < 0) {
          return false; // do nothing
        }        
        break;
      }
      case faceEast: {
        if (++x > maxCols) {
          return false; // do nothing
        }
        break;
      }
      case faceWest: {
        if (--x < 0) {
          return false; // do nothing
        }
        break;
      }
      default: break;
    }

    const gridId = 'x_' + x + '_y_' + y;
    document.getElementById(currentGridId).innerHTML = '';
    setCurrentGrid({
      x: x,
      y: y,
      facing: facing,
      arrow: arrow,
      icon: icon
    });

    displayRobot(gridId, arrow, icon);
  }
  
  const leftRobot = () => {
    let {x, y, facing, arrow, icon} = currentGrid;
    let currentGridId = 'x_' + x + '_y_' + y;

    const [newFacing, newArrow] = mapFace[facing].left.split(':');
    const newIcon = mapFace[newFacing].icon;
    setCurrentGrid({
      x: x,
      y: y,
      facing: newFacing,
      arrow: newArrow,
      icon: newIcon
    });

    displayRobot(currentGridId, newArrow, newIcon);
  }
      
  const rightRobot = () => {
    let {x, y, facing, arrow, icon} = currentGrid;
    let currentGridId = 'x_' + x + '_y_' + y;

    let [newFacing, newArrow] = mapFace[facing].right.split(':');
    const newIcon = mapFace[newFacing].icon;
    setCurrentGrid({
      x: x,
      y: y,
      facing: newFacing,
      arrow: newArrow,
      icon: newIcon
    });

    displayRobot(currentGridId, newArrow, newIcon);
  }

  const reportRobot = () => {
    let {x, y, facing, arrow, icon} = currentGrid;
    setPlaceCommand(x + ',' + y + ',' + facing);
  }

  const reset = () => {
    window.location.reload();
  }
      
  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12}>
        {rows.map((x) => (
        <Grid container justify="center" spacing={1}>
          {columns.map((y) => (
            <Grid key={y} item>
              <Paper 
               className={classes.paper} 
               id={"x_"+y+"_y_"+x}
              />
            </Grid>
          ))}
        </Grid>
        ))}
      </Grid>
      <Typography style={{ marginTop: 200 }}>
        &nbsp;
      </Typography>
      <Grid container align="left" spacing={1}>
        <Grid item xs={12} align="left">
          <TextField 
           value={placeCommand}
           onChange={(e) => {setPlaceCommand(e.target.value)}}
           label='Position (X,Y,F)'
           InputProps={{ inputComponent: PlaceInput }}
          />          
          <br/><br/>
          <Button onClick={() => {placeRobot()}} disabled={false}>place</Button>
          <Button onClick={() => {moveRobot()}} disabled={!isRobotOnGrid}>move</Button>
          <Button onClick={() => {leftRobot()}} disabled={!isRobotOnGrid}>left</Button>
          <Button onClick={() => {rightRobot()}} disabled={!isRobotOnGrid}>right</Button>
          <Button onClick={() => {reset()}} disabled={!isRobotOnGrid}>reset</Button>
          {/* <Button onClick={() => {reportRobot()}} disabled={!isRobotOnGrid}>report</Button> */}
          </Grid>
      </Grid>
    </Grid>      
  );
}
