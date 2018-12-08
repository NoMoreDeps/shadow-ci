import * as M     from "@material-ui/core"       ;
import * as React from "react"                   ;
import MenuIcon   from '@material-ui/icons/Menu' ;

const styles = ({ palette, spacing }: M.Theme) => M.createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft  : -12 ,
    marginRight : 20  ,
  },
});

interface Props extends M.WithStyles<typeof styles> {

}

const AppBar = M.withStyles(styles)(class extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
  const {classes} = this.props;
  return (
    <div className={classes.root}>
      <M.AppBar position="static">
        <M.Toolbar>
          <M.IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </M.IconButton>
          <M.Typography variant="h6" color="inherit" className={classes.grow}>
            News
          </M.Typography>
          <M.Button color="inherit">Login</M.Button>
        </M.Toolbar>
      </M.AppBar>
    </div>
  );
}
});

export {
  AppBar
}



