import React, {useState} from 'react';
import { PaystackConsumer } from 'react-paystack';
import Button from '@material-ui/core/Button';
import { useNavigate } from "react-router-dom"
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from "react-redux";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { db } from "./../Service/firebase";
import { saveDetails, saveError, saveLoading } from "../Redux/Slice";



function Payment({children, course}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state);
  const AuthState = useSelector((state) => state.auth.Auth);
  const [loading, setLoading] = useState(false)
  const [Dopen, setDOpen] = React.useState(false);
  const [alert, setAlert] = React.useState("");
  const [severity, setSeverity] = React.useState("");
   const navigate = useNavigate();
  const toDate = () => {
    let date = new Date();
    const today = date.toDateString();
    return today;
  };
  const handleClickOpen = () => {
    setDOpen(true);
  };

  const handleClosed = () => {
    setDOpen(false);
  };
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };
  const [snackOpen, setSnackOpen] = React.useState(false);
  const config = {
      reference: (new Date()).getTime().toString(),
      email: user.auth.details.email,
      amount: 20000*100,
      publicKey:'pk_test_d8e8e310437f9956a2056020257e10e2310ceb1d',
    };
  const handleSuccess = (reference) => {
    if(user.auth.details.uid){
      setLoading(true)
      return db.collection("users").doc(`${user.auth.details.uid}`).update({
          course:course,
          subscribed:true,
          // paidAt:date.toDateString(),
      })
      .then(() => {
          setAlert("Paid succesfully")
          setSeverity("success")
                  setSnackOpen(true)
                  setDOpen(false)
           db.collection('users').doc(`${user.auth.details.uid}`).get()
          .then((doc) => {
              if (doc.exists) {
                   dispatch(saveDetails(doc.data()));
                   dispatch(saveLoading(false))
                      setLoading(false)
                     navigate('/admin')
                }
               else {
                  console.log("User Not Found")
                  dispatch(saveLoading(false))
                }
            })
          .catch((error) => {
              dispatch(saveError(error));
              dispatch(saveLoading(false))
          });  
      })
      .catch((error) => {
          setLoading(false)
          setAlert(error.message)
          setSeverity("error")
          setSnackOpen(true)
      });
    }
  };
  // you can call this function anything
  const handleClose = () => {
          
    // implementation for  whatever you want to do when the Paystack dialog closed.
  }
  const componentProps = {
      ...config,
      text: 'Paystack Button Implementation',
      onSuccess: (reference) => handleSuccess(reference),
      onClose: handleClose
  };
  const handleChangeCourse = () =>{
    setLoading(true)
    if(user.auth.details.uid){
      return db.collection("users").doc(`${user.auth.details.uid}`).update({
          course:course
      })
      .then(() => {
          setLoading(false)
          setAlert("Course changed succesfully")
          setSeverity("success")
          setSnackOpen(true)
          setDOpen(false)
      })
      .catch((error) => {
          setLoading(false)
          setAlert(error.message)
          setSeverity("error")
          setSnackOpen(true)
      });
    }
  };
    return (
       <>
        {
          !user.auth.details.subscribed ? 
          <PaystackConsumer {...componentProps} >
          {({initializePayment}) => <div onClick={() => initializePayment(handleSuccess, handleClose)}>{children}</div>}
        </PaystackConsumer>:
        <>
        <div onClick={handleClickOpen}>
          {children}
           
        </div>
<Dialog
        open={Dopen}
        onClose={handleClosed}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Register another course?"}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" id="alert-dialog-description">
           You have already Registered a course, Do You which to change Your Course to {course}
          </Typography>
        </DialogContent>
        <DialogActions>
          {
            !loading ? 
            <Button onClick={handleClosed} color="primary">
            No Back
          </Button>:<></>
          }
          <Button onClick={handleChangeCourse} color="primary" autoFocus>
            {loading ? <CircularProgress size={30}/> : "Yes Change My course"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity={severity}>
          {alert}
        </Alert>
      </Snackbar>
        </>
        }
       </>
    );
  }
  export default Payment;


  function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}