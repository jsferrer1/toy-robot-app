import React from 'react';
import { useState } from 'react';
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

const createEmpty2DArray = (height, width) => {
  let data = [];
  for (let i = 0; i < height; i++) {
    data.push([]);
    for (let j = 0; j < width; j++) {
      data[i][j] = {
        x: i,
        y: j,
        facingDirection: '',
        isBotHere: false,
      };
    }
  }
  return data;
}



/**
 * main function
 */

export default function GridBoard() {
  const classes = useStyles();
  const [placeCommand, setPlaceCommand] = useState('');
  const [currentGridId, setCurrentGridId] = useState('');

  const rows = arrayFromInteger(5);
  const columns = arrayFromInteger(5);

  const mapFace = {
    'NORTH' : '^',
    'EAST' : '>',
    'WEST' : '<',
    'SOUTH' : 'V'
  }

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      setPlaceCommand(e.target.value);
      e.preventDefault();
    }
  }

  const placeRobot = () => {
    console.log('placeCommand: ', placeCommand);
    let [x,y,f] = placeCommand.trim().split(',');
    console.log('x: ', x--);
    console.log('y: ', y--);
    console.log('f: ', f);
    console.log('facing: ', mapFace[f]);
    const gridId = 'x_' + x + '_y_' + y;
    document.getElementById(gridId).innerHTML = '<p>'+mapFace[f]+'</p>';
    setCurrentGridId(gridId);
    // disable command and place
  }

  const moveRobot = () => {
    document.getElementById('x_0_y_0').innerHTML = '<p>bot</p>';
  }
  
  const hideRobot = () => {
    document.getElementById('x_0_y_0').innerHTML = '';
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
               id={"x_"+x+"_y_"+y}
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
           label="Command" 
           onKeyPress={(e) => {handleCommand(e)}}
           InputProps={{ inputComponent: PlaceInput }}
          />          
          <br/><br/>
          <Button onClick={() => {placeRobot()}}>place</Button>
          <Button onClick={() => {moveRobot()}}>move</Button>
          <Button onClick={() => {hideRobot()}}>left</Button>
          <Button onClick={() => {hideRobot()}}>right</Button>
          <Button onClick={() => {hideRobot()}}>report</Button>
          <Button onClick={() => {reset()}}>reset</Button>
        </Grid>
      </Grid>
    </Grid>      
  );
}
