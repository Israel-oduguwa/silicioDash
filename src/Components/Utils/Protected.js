import React from "react"
import { Route, Navigate, useLocation, } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from "react-redux";
// import { useAuth } from "../../Context/AuthContext"

// export default function ProtectedAuth({ component: Component, ...rest }) {
//   const { currentUser } = useAuth()
//   const c = false
//   return (
//     <Route
//       {...rest}
//       render={props => {
//         return c ? <Component {...props} /> : <Navigate to="/login" />
//       }}
//     ></Route>
//   )
// }
import {auth, db} from "../../Service/firebase";


export default function ProtectedAuth({ children }){

  const user = useSelector((state) => state);
  let location = useLocation();
  if(user.auth.loading){
    return (<div className="row mt-4"  >
          <div className="col-md-12 text-center">
            <CircularProgress size={70} style={{marginTop:"30vh"}} />
          </div>
        </div>)
  }
  if (user.auth.details){
      return children;
  }
  else{
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
}