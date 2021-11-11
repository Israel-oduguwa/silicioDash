import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  main:{
  	// marginTop:"10px",
  },
}));
export default function BoardLayout({children}) {
	const classes = useStyles();
	return (
		<>
		<CssBaseline/>
			<div className="wrapper">
					{children}
			</div>
		</>
	)
}