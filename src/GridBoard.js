import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask';

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
  },  
}));

const PlaceInput = ({ inputRef, ...props }) => (
  <MaskedInput
    {...props}
    ref={ref => {
      inputRef(ref ? ref.inputElement : null);
    }}
    mask={[
      /[1-5]/,
      ',',
      /[1-5]/,
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

const arrayFromInteger = (range) => Array.from(Array(range).keys(), i => i);

/**
 * main function
 */

export default function GridBoard() {
  const classes = useStyles();
  const [placeCommand, setPlaceCommand] = useState('');
  const [currentGrid, setCurrentGrid] = useState({});
  const [isRobotOnGrid, setIsRobotOnGrid] = useState(false);

  useEffect(() => {
    console.log('currentGrid: ', currentGrid);
    reportRobot();
  }, [currentGrid]);  

  const maxRows = 5;
  const maxCols = 5;
  const rows = [1,2,3,4,5];
  const columns = [1,2,3,4,5];

  const faceNorth = 'NORTH';
  const faceEast = 'EAST';
  const faceWest = 'WEST';
  const faceSouth = 'SOUTH';
  const mapFace = {
    'NORTH' : {arrow:'^', left: 'WEST:<', right: 'EAST:>'},
    'EAST' : {arrow:'>', left: 'NORTH:^', right: 'SOUTH:V'},
    'WEST' : {arrow:'<', left: 'SOUTH:V', right: 'NORTH:^'},
    'SOUTH' : {arrow:'V', left: 'EAST:>', right: 'WEST:<'},
  }

  const keyFace = Object.keys(mapFace);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      setPlaceCommand(e.target.value);
      e.preventDefault();
    }
  }

  const placeRobot = () => {
    console.log('placeCommand: ', placeCommand);
    let [x,y,f] = placeCommand.trim().split(',');
    let arrow = '';
    console.log('x: ', x);
    console.log('y: ', y);
    console.log('f: ', f);
    if (!keyFace.includes(f)) {
      return false;
    }
    arrow = mapFace[f].arrow
    console.log('facing: ', arrow);
    const gridId = 'x_' + x + '_y_' + y;
    console.log('currentGridId: ', gridId);
    document.getElementById(gridId).innerHTML = '<p>'+arrow+'</p>';
    setCurrentGrid({
      x: x,
      y: y,
      facing: f,
      arrow: arrow
    });

    // disable command and place
    setIsRobotOnGrid(true);
  }

  const moveRobot = () => {
    console.log('moveRobot: currentGrid: ', currentGrid);
    let {x, y, facing, arrow} = currentGrid;
    console.log('moveRobot: x: y: ', x, y);
    let currentGridId = 'x_' + x + '_y_' + y;

    switch (facing) {
      case faceNorth: {
        if (--y < 1 ) {
          return false; // do nothing
        }
        break;
      }
      case faceSouth: {
        if (++y > maxRows) {
          return false; // do nothing
        }        
        break;
      }
      case faceEast: {
        if (++x > maxRows) {
          return false; // do nothing
        }
        break;
      }
      case faceWest: {
        if (--x < 1) {
          return false; // do nothing
        }
        break;
      }
      default: break;
    }

    const gridId = 'x_' + x + '_y_' + y;
    document.getElementById(currentGridId).innerHTML = '';
    document.getElementById(gridId).innerHTML = '<p>'+arrow+'</p>';
    setCurrentGrid({
      x: x,
      y: y,
      facing: facing,
      arrow: arrow
    });
  }
  
  const leftRobot = () => {
    console.log('leftRobot: currentGrid: ', currentGrid);
    let {x, y, facing, arrow} = currentGrid;
    console.log('leftRobot: x: y: ', x, y);
    let currentGridId = 'x_' + x + '_y_' + y;

    let [newFacing, newArrow] = mapFace[facing].left.split(':');
    document.getElementById(currentGridId).innerHTML = '<p>'+newArrow+'</p>';
    setCurrentGrid({
      x: x,
      y: y,
      facing: newFacing,
      arrow: newArrow
    });
  }
      
  const rightRobot = () => {
    console.log('leftRobot: currentGrid: ', currentGrid);
    let {x, y, facing, arrow} = currentGrid;
    console.log('leftRobot: x: y: ', x, y);
    let currentGridId = 'x_' + x + '_y_' + y;

    let [newFacing, newArrow] = mapFace[facing].right.split(':');
    document.getElementById(currentGridId).innerHTML = '<p>'+newArrow+'</p>';
    setCurrentGrid({
      x: x,
      y: y,
      facing: newFacing,
      arrow: newArrow
    });
  }

  const reportRobot = () => {
    let {x, y, facing, arrow} = currentGrid;
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
           id="placeCommand" 
           value={placeCommand}
           label='Place'
           disabled={isRobotOnGrid}
           onKeyPress={(e) => {handleCommand(e)}}
           InputProps={{ inputComponent: PlaceInput }}
          />          
          <br/><br/>
          <Button onClick={() => {placeRobot()}} disabled={isRobotOnGrid}>place</Button>
          <Button onClick={() => {moveRobot()}} disabled={!isRobotOnGrid}>move</Button>
          <Button onClick={() => {leftRobot()}} disabled={!isRobotOnGrid}>left</Button>
          <Button onClick={() => {rightRobot()}} disabled={!isRobotOnGrid}>right</Button>
          {/* <Button onClick={() => {reportRobot()}} disabled={!isRobotOnGrid}>report</Button> */}
          <Button onClick={() => {reset()}}>reset</Button>
        </Grid>
      </Grid>
    </Grid>      
  );
}
