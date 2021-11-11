import React, {useEffect} from "react";
import './App.css';
import Container from '@material-ui/core/Container';
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Reset from "./Components/Pages/Reset";
import ForgotPassword from "./Components/Pages/ForgotPassword";
import CssBaseline from '@material-ui/core/CssBaseline';
import DashBoard from "./Components/Pages/DashBoard";
import {Helmet} from "react-helmet";
// import Layout from "./Components/Pages/Layout/Layout";
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveUser, saveDetails, saveError, saveLoading, setAuth } from "./Redux/Slice";
import {auth, db} from "./Service/firebase";
import ProtectedAuth from "./Components/Utils/Protected";
const theme = createTheme({
        breakpoints:{
            values:{
                xs:0,
                sm: 768,
                md: 960,
                lg: 1280,
                xl: 1920,
            },
        },
        palette: {
            mode:"light",
            background:{
                default: "white",
            },
            navBar:{
                main:"#ffff",
                background:"white",
                contrastText:"black",
            },
            primary: {
            
             main: '#08905B',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
            },
            secondary: {
              light: '#08095b',
              main: '#08095b',
              // dark: will be calculated from palette.secondary.main,
              contrastText: '#ffcc00',
            },
                },
    });


function App() {
  const user = useSelector((state) => state.auth.value);
  const AuthState = useSelector((state) => state.auth.Auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(saveLoading(true))
    auth.onAuthStateChanged((user) => {
      if (user) {
       
        dispatch(saveUser({
            userId:user.uid
        }));
        dispatch(setAuth(true))
       db.collection('users').doc(`${user.uid}`).get().then((doc) => {
        
        if (doc.exists) {
             dispatch(saveDetails(doc.data()));
             dispatch(saveLoading(false))
          }
           else {
              dispatch(saveLoading(false))
            }
      })
      .catch((error) => {
          dispatch(saveError(error));
          dispatch(saveLoading(false))
      });   
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [auth, dispatch]);

  return (
    <ThemeProvider theme={theme}>
        <div className="App">            
                <Routes basename="/index.html">
                  <Route path="admin/*" element={
                    <ProtectedAuth>
                        <DashBoard/>
                    </ProtectedAuth>
                  } />
                  <Route path="" element={<Register/>} />
                  <Route path="/login" element={<Login/>} />
                  />
                  <Route path="*" element={<div class="row">
                      <div class="col-md-12 text-center" style={{marginTop:"10vh"}} >
                        <Helmet>
                        <title>
             404 Error | Silicio
        </title>
        </Helmet>
                        <div className="mt-4 mb-4">
                        <Typography variant="h2" color="secondary">
                            404 Error, Page not Found
                        </Typography></div>
                        <Link to="/">
                        <Button variant="contained" color="primary">
                            Back
                        </Button></Link>
                      </div>
                    </div>
                }/>
                </Routes>
        </div>
    </ThemeProvider>
  );
}

export default App;
