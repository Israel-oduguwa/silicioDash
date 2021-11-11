import React, { useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useNavigate, Navigate } from "react-router-dom"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { db, auth } from "../../Service/firebase";
import { useSelector } from "react-redux";
import {Helmet} from "react-helmet";
const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto'
  },
  contain:{
  	padding:"32px",
  },
  button: {
    marginTop: 20,
    position: 'relative',
    width:"100%",
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  fw6:{
  	fontWeight:600,
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  },
}));
export default function Login() {
	 const navigate = useNavigate()
	  const theme = useTheme();
	 const [error, setError] = useState("");
	 const AuthState = useSelector((state) => state.auth.value);
	 const userDetail = useSelector((state) => state.auth.details);


	const [loading, setLoading] = useState(false)
	const [state, setState] = useState({
	  	email: '',
      password: '',
	})
const matches = useMediaQuery(theme.breakpoints.up('sm'))
	const handleSubmit = (e) =>{
    e.preventDefault()
      setError("")
      setLoading(true)
      auth.signInWithEmailAndPassword(state.email, state.password)
      .then((data) =>{
      	const uid = data.user.uid
      	db.collection('users').doc(`${uid}`).get()
      	.then((doc) =>{
      		if(doc.exists){	
      			navigate("/admin")
    				setLoading(false)
      		}
      		else{
      			setLoading(false);
      			setError("You have not Registered Yet, Register Now")
      		}
      	})
      	.catch((error) =>{
      	      		setLoading(false)
      		setError(error.message)
      	})
      })
      .catch((error) =>{
      		setLoading(false)
      		setError(error.message)
      	})
      
  }
  const handleChange = (e) => {
    setState({
    	...state,
      [e.target.name]: e.target.value
    });
    setError("")
  };
	const classes = useStyles();
	if(!userDetail){
			return (
		<>
		<div className="register">
		<Helmet>
			<title>
				Login
			</title>
		</Helmet>
			<div className="space">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12" style={{display: matches ? 'absolute':'flex' , justifyContent:matches ? "inherit": "center"}}>
							<div className="logo" style={{margin: matches ?"30px": " 30px 0 0 0", position: matches ? 'absolute' : 'inherit', zIndex:"999"}}>
									<Grid item xs={2}>
											<img width="50" src="https://www.thesilicio.com/Images/logo3.png" alt="Logo"/>
									</Grid>
								</div>
						</div>
						<div className="col-md-6 d-none d-md-block">
							<Paper className="papers" elevation={2}>
								<div className={classes.contain} >
								
								<div className="hype">
									<Typography className={classes.fw6} color="secondary" variant="h5" style={{margin:"80px 0px 40px"}}>
										Gain A skill in the Tech Industry At Silicio, we Help You be the Best  
									</Typography>
								</div>
								<div className="illustrate">
									<img src="https://image.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg" width="100%" alt="..."/>
								</div>
							</div>
							</Paper>
						</div>
						<div className={`col-md-6 ${matches ? "":"text-center"}`}>
							<div className="contain" style={{margin:matches ? "100px 100px 0 0": "0"}} >
								<div className="form" style={{margin: matches ? '60px 50px 0 50px':'inherit'}}>
									<Typography  variant="body1" className={classes.fw6} color="primary" style={{margin:"20px 0px"}}  >
										Login to Your Dash Board by Entering your email and password below
									</Typography>
									<div className="form-space" >
										<form onSubmit={handleSubmit} noValidate >
											<div className="row text-center" >
												
												<div className="col-md-12  mb-2">
													<TextField
							              id="email"
							              name="email"
							              type="email"
							              label="Email address"
							              variant="outlined"
							              className={classes.textField}
							              // helperText={errors.email}
							              // error={errors.email ? true : false}
							              value={state.email}
							              onChange={handleChange}
							              fullWidth
							            />
												</div>
												<div className="col-md-12 mb-2">
													<TextField
							              id="password"
							              name="password"
							              type="password"
							              variant="outlined"
							              label="Password"
							              className={classes.textField}
							              // helperText={errors.password}
							              // error={errors.password ? true : false}
							              value={state.password}
							              onChange={handleChange}
							              fullWidth
							            />
												</div>
												
												<div className="text-center" className="col-md-12  mb-2">
													<Button
							              type="submit"
							              variant="contained"
							              color="primary"
							              className={classes.button}
							              disabled={loading}
							              disableElevation
							              size="large"
							            >
							              Login
							              {loading && (
							                <CircularProgress size={30} className={classes.progress} />
							              )}
							            </Button>
												</div>
												<div  className="col-md-12">
													
							            <Link to="/">
							            <Typography color="primary" variant="subtitle2" >
							              Don't have account with us ? register Here
							            </Typography>
							            </Link>
							            {error && (
							              <Typography variant="body2" className={classes.customError}>
							                {error}
							              </Typography>
							            )}
												</div>	
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</>
	)}
	else{
		return <Navigate to="/admin"/>
	}
	
}