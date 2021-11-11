// export const firebaseConfig = {
//   apiKey: "AIzaSyBVjsJyIzZGti78u9z2AvjkpEoeb9sOMy4",
//   authDomain: "silicio-c7dc1.firebaseapp.com",
//   projectId: "silicio-c7dc1",
//   storageBucket: "silicio-c7dc1.appspot.com",
//   messagingSenderId: "297538591762",
//   appId: "1:297538591762:web:845f66c0f22a02c7d58ccb",
//   measurementId: "G-B7H2RNGH3Z"
// };


import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: "silicio-c7dc1",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: "297538591762",
  appId: process.env.REACT_APP_MEASURMENT_ID,
  measurementId:process.env.REACT_APP_APP_ID,
})

export const auth = app.auth()
export const db = app.firestore()
export default app

