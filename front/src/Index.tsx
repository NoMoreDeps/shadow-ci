import * as M from "@material-ui/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { teal } from "@material-ui/core/colors";
import {AppBar} from "./controls/AppBar";

const theme = M.createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#b71c1c',
    },
  },
});

ReactDOM.render((
  <React.Fragment>
    <M.CssBaseline />
    <M.MuiThemeProvider theme={theme}>
      <div>
        <AppBar  />
      </div>
    </M.MuiThemeProvider> 
  </React.Fragment>
), document.querySelector("#app"))