// import React, { useState } from "react";
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { Link, useNavigate, Navigate } from "react-router-dom"
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import Navbar from "../Layout/Navbar";
// import { db, auth } from "../../Service/firebase";
// import { useSelector, useDispatch } from "react-redux";
// const useStyles = makeStyles((theme) => ({
//   form: {
//     textAlign: 'center'
//   },
//   image: {
//     margin: '20px auto 20px auto'
//   },
//   pageTitle: {
//     margin: '10px auto 10px auto'
//   },
//   textField: {
//     margin: '10px auto 10px auto'
//   },
//   button: {
//     marginTop: 20,
//     position: 'relative',
//     width:"100%"
//   },
//   customError: {
//     color: 'red',
//     fontSize: '0.8rem',
//     marginTop: 10
//   },
//   progress: {
//     position: 'absolute'
//   },
// }));
// const Reset = () => {
//   const [error, setError] = useState("");
//   const [state, setState] = useState({
//         email: '',
//     })
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//       const theme = useTheme();
//       const AuthState = useSelector((state) => state.auth.value);
//       const matches = useMediaQuery(theme.breakpoints.up('sm'))
//   const handleReset = () => {
//       auth.sendPasswordResetEmail(state.email)
//       .then(() => {
//         navigate('/login')
//       })
//       .catch((error) => {
//         setLoading(false)
//         setError(error.message)
//       });
//   };
//   const handleChange = (e) => {
//     setState({
//       ...state,
//       [e.target.name]: e.target.value
//     });
//   };
//   const classes = useStyles();
//   if(!AuthState){
//     return (
//     <>
//     <div className="register">
//       <div className="space">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-6" >
//               <div className="logo" >
//                   <Grid item xs={2}>
//                       <img width="50" src="https://www.thesilicio.com/Images/logo3.png" alt="Logo"/>
//                   </Grid>
//                 </div>
//             </div>
            
//             <div className="col-md-6">
//               <div className="containsreset">
//                 <div className="col-md-6  mb-2">
//                           <TextField
//                             id="email"
//                             name="email"
//                             type="email"
//                             label="Email address"
//                             variant="outlined"
//                             className={classes.textField}
//                             // helperText={errors.email}
//                             // error={errors.email ? true : false}
//                             value={state.email}
//                             onChange={handleChange}
//                             fullWidth
//                           />
//                         </div>
                       
//                         <div className="text-center" className="col-md-12  mb-2">
//                           <Button
//                             type="submit"
//                             variant="contained"
//                             color="primary"
//                             className={classes.button}
//                             disabled={loading}
//                             disableElevation
//                             size="large"
//                           >
//                             Reset Password
//                             {loading && (
//                               <CircularProgress size={30} className={classes.progress} />
//                             )}
//                           </Button>
//                         </div>
//                         <div className="text-center" className="col-md-12">
//                           <Typography variant="subtitle2" >
//                              <Link to="/">Login Here</Link>
//                           </Typography>
//                           <Typography variant="subtitle2" >
//                              <Link to="/">Not Registerd Yet, Resgiter Now.</Link>
//                           </Typography>
//                           {error && (
//                             <Typography variant="body2" className={classes.customError}>
//                               {error}
//                             </Typography>
//                           )}
//                     </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   )
//   }
//   else{
//     return (<><Navigate to="/admin"/></>)
//   }
// };

// export default Reset;