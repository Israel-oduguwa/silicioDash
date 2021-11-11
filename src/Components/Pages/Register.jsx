import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useNavigate, Navigate } from "react-router-dom"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { db, auth } from "../../Service/firebase";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from "react-redux";
import {Helmet} from "react-helmet";
import {setAuth, saveLoading } from "../../Redux/Slice";
const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: 'center'
  },
  contain:{
  	padding:"32px",
  },
  image: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative',
    width:"100%",
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  },
  fw6:{
  	fontWeight:600,
  }
}));
export default function Register() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const AuthState = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const userDetail = useSelector((state) => state.auth.details);
  const theme = useTheme();
	const [state, setState] = useState({
		firstName:"",
		lastName:"",
	  email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
	})
	 
    let date = new Date();
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
	const handleSubmit = (e) => {
	    e.preventDefault()
	    const {password, confirmPassword,email, firstName,lastName}=state
	    if (password !== confirmPassword) {
	      return setError("Passwords do not match")
	    }
	   		setError("")
	      	setLoading(true)
	       	auth.createUserWithEmailAndPassword(email, password)
	       	.then((data) =>{
	       		const uid = data.user.uid
	       		db.doc(`/users/${uid}`).set({
		        firstName:firstName,
		        lastName:lastName,
		        email:email,
		        subscribed:false,
		        uid:uid,
		        registerdAt:date.toDateString()
	      		});
	       	})
	       	.then((data) =>{
	       	setLoading(false)
	       	dispatch(saveLoading(true))
	       	dispatch(setAuth(true))
		      navigate("/admin")
	       	})
	       	.catch((error) =>{

	       		setLoading(false)
	       		setError(error.message)
	       	})  	
	       }

	
  const handleChange = (e) => {
    setState({
    	...state,
      [e.target.name]: e.target.value,
    });
    setError("")
  };

	const classes = useStyles();
	if(!userDetail){
		return (
		<div className="register">
		<Helmet>
		<title>
			Regiter | Silicio
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
									<Typography  variant="h6" className={classes.fw6} color="primary" style={{margin:"20px 0px"}}  >
										Register to get started
									</Typography>
									<div className="form-space" >
										<form onSubmit={handleSubmit} noValidate >
											<div className="row text-center" >
												<div className="col-md-6 mb-2">
													<TextField
							              id="firstName"
							              name="firstName"
							              type="text"
							              label="First name"
							              variant="outlined"
							              className={classes.textField}
							              // helperText={errors.firstName}
							              // error={errors.firstName ? true : false}
							              value={state.firstName}
							              onChange={handleChange}
							              fullWidth
							            />
												</div>
												<div className="col-md-6  mb-2">
													<TextField
							              id="lastName"
							              name="lastName"
							              variant="outlined"
							              type="text"
							              label="Last name"
							              className={classes.textField}
							              // helperText={errors.lastName}
							              // error={errors.lastName ? true : false}
							              value={state.lastName}
							              onChange={handleChange}
							              fullWidth
							            />
												</div>
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
												<div className="col-md-12  mb-2">
													<TextField
							              id="confirmPassword"
							              name="confirmPassword"
							              type="password"
							              variant="outlined"
							              label="Confirm Password"
							              className={classes.textField}
							              // helperText={errors.confirmPassword}
							              // error={errors.confirmPassword ? true : false}
							              value={state.confirmPassword}
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
							              Register
							              {loading && (
							                <CircularProgress size={30} className={classes.progress} />
							              )}
							            </Button>
												</div>
												<div className="text-center" className="col-md-12">
												<Link to="/login">
													<Typography variant="subtitle2" color="primary" >
							              Already Registered ? Login here
							            </Typography>
							            </Link>
							            {error && (
							              <Typography variant="body2"  className={classes.customError}>
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
	)
	}
	else{
		return <Navigate to="/admin"/>
	}
}

