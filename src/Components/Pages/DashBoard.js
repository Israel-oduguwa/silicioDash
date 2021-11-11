import React  from 'react';
import Classes from "./Classes";
import User from "./User";
import Typography from "@material-ui/core/Typography";
import Navbar from "../Layout/Navbar";
import SideBar from "../Layout/SideBar";
import BoardLayout from "../Layout/BoardLayout"
import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
export default function DashBoard() {
  const currentUser =true
  let location = useLocation();
   const user = useSelector((state) => state);
    return (
    <div className="container-fluid" style={{height:"100vh", overflow:"hidden"}} >
          <div className="row">
          <div style={{padding:0}} className="col-md-3 d-none d-md-block">
            <SideBar/>
          </div>
          <div style={{padding:0}}  className="col-md-9">
            <Navbar/>
            <BoardLayout>
                <div className="container">
                <Routes>
                  <Route path="/" element={
                      <User/> } />
                  <Route path="/classes" element={
                      <Classes/>} />
                    <Route path="*" element={<div class="row">
                      <div class="col-md-12 text-center" style={{marginTop:"10vh"}} >
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
                <footer>
                  <div className="container">
                    <div className="row mb-4 mt-4">
                      <div className="col-md-12 text-center">
                        <Typography variant="subtitle2">
                          &copy; Copyright {new Date().getFullYear()}, Silicio All rights Reserved
                        </Typography>
                      </div>
                    </div>
                  </div>
                </footer>
            </BoardLayout>
          </div>
        </div>
       
        </div>
  )
}