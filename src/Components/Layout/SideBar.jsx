import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import DraftsIcon from '@material-ui/icons/Drafts';
import {Link} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import SideLinks from "./SideLinks"
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import LogOut from "./LogOut";
const useStyles = makeStyles((theme) => ({
  root: {
    height:"100vh",
    width: '100%',
    borderRadius:"0px",
    borderRight:"1.6px solid rgba(0,0,0,0.1)"
    // backgroundColor: theme.palette.background.paper,
  },
  logo:{
  	height:"64px",
  	// display:"flex",
  	padding:"10px 0"
  },
   button:{
  	borderRadius:"7px",
  	marginBottom:"6px",
  }
}));

const SideBar = () => {
  
	const classes = useStyles();
		const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
	const links = [{name:"User", id:0, path:'',url:"https://img.icons8.com/color/30/000000/compass--v2.png"},
	{name:"Classes",id:1,path:"classes", url:"https://img.icons8.com/color/30/000000/saving-book.png"}, ]
	return (
		<div>
			<Paper elevation={0} className={classes.root}>
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-12">
										<div className={classes.logo}>
											<Link to="/">
												<Grid container spacing={0}>
													<Grid item xs={12}>
														<img width="110" src="https://www.thesilicio.com/Images/silicio-tm.png" alt="Logo"/>
													</Grid>
												</Grid>
												{/*<Typography variant="h6">Silicio</Typography>*/}
											</Link>
										</div>
									</div>
								</div>
							</div>
							<Divider />
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-12">
										
										<div style={{overflow:"auto", height:"calc(100vh - 64px)"}} >
									      <List component="nav" aria-label="main mailbox folders">
									        {
									        	links.map((link, index) =>
									        	{
									        		const Path = `${link.path}`
									        		return(
									        					<Link key={link.id} to={Path}>
											        			<ListItem
											        			className={classes.button}
														          button
														          selected={selectedIndex === index}
														          onClick={(event) => handleListItemClick(event, index)}
													        	>
													          		<ListItemIcon>
													            		<img src={link.url}/>
												         		 	</ListItemIcon>
											          				<ListItemText primary={link.name} />
											        			</ListItem>
											        		</Link>
									        			)
									        	})
									        }
									        <LogOut>
									        		<ListItem
											        			className={classes.button}
														          button
														          selected={selectedIndex === 2}
														          onClick={(event) => handleListItemClick(event, 2)}
													        	>
													          		<ListItemIcon>
													            		<img src="https://cdn-icons-png.flaticon.com/512/3596/3596144.png" width="30px" alt="..."/>
												         		 	</ListItemIcon>
											          				<ListItemText primary={"Log Out"} />
											        			</ListItem>
									        </LogOut>
									      </List>
									    </div>
									</div>
								</div>
							</div>
			 </Paper>

		</div>
	)
}

export default SideBar