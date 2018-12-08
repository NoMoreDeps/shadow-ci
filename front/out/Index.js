"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const M = __importStar(require("@material-ui/core"));
const React = __importStar(require("react"));
const ReactDOM = __importStar(require("react-dom"));
const colors_1 = require("@material-ui/core/colors");
const AppBar_1 = require("./controls/AppBar");
const theme = M.createMuiTheme({
    palette: {
        primary: colors_1.teal,
        secondary: {
            main: '#b71c1c',
        },
    },
});
ReactDOM.render((React.createElement(React.Fragment, null,
    React.createElement(M.CssBaseline, null),
    React.createElement(M.MuiThemeProvider, { theme: theme },
        React.createElement("div", null,
            React.createElement(AppBar_1.AppBar, null))))), document.querySelector("#app"));
