import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import Button from '@material-ui/core/Button';

import {
  AppBar,
  CssBaseline,
  Typography,
  createMuiTheme
} from "@material-ui/core";

import GridBoard from './GridBoard';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const placeRobot = () => {
  document.getElementById('row_0_col_0').innerHTML = '<p>bot</p>';
}

const moveRobot = () => {
  document.getElementById('row_0_col_0').innerHTML = '<p>bot</p>';
}

const hideRobot = () => {
  document.getElementById('row_0_col_0').innerHTML = '';
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar color="inherit">
        <Typography variant="h6">Toy Robot Simulator</Typography>
      </AppBar>
      <Typography style={{ marginTop: 30 }}>
        &nbsp;
      </Typography>
      <GridBoard />
      <Typography style={{ marginTop: 350 }}>
        <Button onClick={() => {placeRobot()}}>place</Button>
        <Button onClick={() => {moveRobot()}}>move</Button>
        <Button onClick={() => {hideRobot()}}>hide</Button>
      </Typography>
    </ThemeProvider>
  );
};

export default App;
