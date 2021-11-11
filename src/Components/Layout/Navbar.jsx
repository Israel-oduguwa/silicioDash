import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSelector,useDispatch } from "react-redux";
// import SideLinks from "./SideLinks";
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import {auth} from "../../Service/firebase";
import Button from '@material-ui/core/Button';
import LogOut from "./LogOut";
import SideBar from "./SideBar";
import { saveError,setAuth } from "../../Redux/Slice";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    width:"73%"
  },
   logo:{
    height:"64px",
    // display:"flex",
    padding:"10px 0",
  },
  large: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));


const Navbar = ({login}) => {
	const classes = useStyles();
  const user = useSelector((state) => state);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

   const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const [openDrawer, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
	return (
		  <div className={classes.root}>
      <AppBar style={{background:"rgba( 255, 255, 255, 0.25 )",
      // backgroundColor:"white",
      // boxShadow:"0 8px 32px 0 rgba( 31, 38, 135, 0.35 )",
      backdropFilter:"blur(12.5px )",
    }} position="sticky">
        <Toolbar>
          {
            !matches  ?
           <>

           <IconButton edge="start" className={classes.menuButton} onClick={handleDrawerOpen} color="inherit" aria-label="menu">
            <MenuIcon color="secondary"/>
          </IconButton> 
          <Link to="/">
                        <Grid container spacing={0}>
                          <Grid item xs={12}>
                            <img width="80" src="https://www.thesilicio.com/Images/silicio-tm.png" alt="Logo"/>
                          </Grid>
                        </Grid>
                        {/*<Typography variant="h6">Silicio</Typography>*/}
                      </Link> 
            </>
            :<></>
          }
          {
            login ? 

          <div className={classes.logo}>
                      <Link to="/">
                        <Grid container spacing={0}>
                          <Grid item xs={2}>
                            <img width="50" src="https://www.thesilicio.com/Images/logo3.png" alt="Logo"/>
                          </Grid>
                          <Grid item xs>
                            <Typography variant="h6" color="primary">
                              Silicio
                            </Typography>
                          </Grid>
                        </Grid>
                        {/*<Typography variant="h6">Silicio</Typography>*/}
                      </Link>
                    </div>:

            <></>
          }
          <Typography variant="h6" className={classes.title}>
            
          </Typography>
          {user.auth.Auth ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <span> </span> <AccountCircle className={classes.large}  color="primary" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <LogOut>
                  <MenuItem >Log Out</MenuItem>
                </LogOut>
                
              </Menu>
            </div>
          ):
          <>
            <Button variant="contained" color="primary">
              Signup
            </Button>
          </>

        }
        </Toolbar>
      </AppBar>
      {
        !matches ?
         <Drawer
        anchor="left"
        open={openDrawer}
        className={classes.drawer}
        onClose={handleDrawerClose}
        classes={{
              paper: classes.drawerPaper,
        }}
      >
      <SideBar/>
      </Drawer>:
      <></>
      }
    </div>
	)
}

export default Navbar