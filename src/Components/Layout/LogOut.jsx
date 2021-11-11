import React from 'react';
import { saveError, setAuth, saveUser,saveDetails } from "../../Redux/Slice";
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../../Service/firebase";

import { useSelector,useDispatch } from "react-redux";
export default function LogOut({children}) {
	 const dispatch = useDispatch();
	  const navigate = useNavigate();
	const handleLogOut = () =>{
     auth.signOut()
      .then(() => {
        dispatch(setAuth(false));
        dispatch(saveDetails(null));
        dispatch(saveUser(null));
        navigate('/login')
      })
      .catch((error) => {
        dispatch(saveError(error.message))
    });

  }
	return (
		<div onClick={handleLogOut}>
			{children}
		</div>
	)
}