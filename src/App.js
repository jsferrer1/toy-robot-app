import React from "react";
import { ThemeProvider } from "@material-ui/styles";

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
      <Typography style={{ marginTop: 200 }}>
        command line
      </Typography>
    </ThemeProvider>
  );
};

export default App;
