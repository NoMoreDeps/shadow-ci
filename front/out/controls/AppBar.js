"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const M = __importStar(require("@material-ui/core"));
const React = __importStar(require("react"));
const Menu_1 = __importDefault(require("@material-ui/icons/Menu"));
const styles = ({ palette, spacing }) => M.createStyles({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});
const AppBar = M.withStyles(styles)(class extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (React.createElement("div", { className: classes.root },
            React.createElement(M.AppBar, { position: "static" },
                React.createElement(M.Toolbar, null,
                    React.createElement(M.IconButton, { className: classes.menuButton, color: "inherit", "aria-label": "Menu" },
                        React.createElement(Menu_1.default, null)),
                    React.createElement(M.Typography, { variant: "h6", color: "inherit", className: classes.grow }, "News"),
                    React.createElement(M.Button, { color: "inherit" }, "Login")))));
    }
});
exports.AppBar = AppBar;
