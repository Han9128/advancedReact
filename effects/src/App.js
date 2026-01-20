import React, { useReducer,useEffect, useState } from "react";
import Home from "./components/Home/Home";
import Welcome from "./components/Welcome/Welcome";

function authReducer(state, action){
  switch (action.type){
    case "LOGIN":
      return {
        isLoggedin:true
      }
    case "LOGOUT":
      return {
        isLoggedin:false
      }
    default:
      return state;
  }
}

const initialStatus = {
  isLoggedin:false
}

function App() {
  const [authStatus, dispatchAuthStatus] = useReducer(authReducer,initialStatus);
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  // const [isLoginValid, setLoginValid] = useState(false);

  const isLoginValid = email.length >5 && password.length>5;

  // Here if we want that when a user login then we store their status in local storage and 
  // they be logged in even if they close tab or refresh. we can try doing this using below commented 
  // method but it goes in infinite loop. To tackle this situation we use useEffect 
  // const storedLogin = localStorage.getItem("isLoggedin");
  // if(storedLogin === "1"){
  //   dispatchAuthStatus({
  //     type:"LOGIN"
  //   })
  // }

  useEffect(()=>{
    const storedLogin = localStorage.getItem("isLoggedin");
  if(storedLogin === "1"){
    dispatchAuthStatus({
      type:"LOGIN"
    })
  }
  },[])
  function handleLogin(){
    // console.log("login")
    dispatchAuthStatus({
      type:"LOGIN"
    })
    localStorage.setItem("isLoggedin","1");
  }
  function handleLogout(){
    // console.log("logout")
    dispatchAuthStatus({
      type:"LOGOUT"
    })
    localStorage.removeItem("isLoggedin")
  }

  // Here we can see that setLoginValid is depending on email and password only so we can just
  //  create a variable and remove this state formvalid state
  // useEffect(()=>{
  //   setLoginValid(email.length>5 && password.length > 5);
  // },[email,password])
   
  function handleEmailChange(e){
    const enteredEmail = e.target.value;
    // console.log(enteredEmail);
    setEmail(enteredEmail);

  }
  function handlePassChange(e){
    const enteredPass = e.target.value;
    // console.log(enteredPass);
    setPassword(enteredPass);

  }
  return (  
    <>
    <Home onLogin = {handleLogin} isLoggedin={authStatus.isLoggedin} onEmailChange = {handleEmailChange} onPassChange = {handlePassChange} isLoginValid={isLoginValid}/>
    <Welcome isLoggedin={authStatus.isLoggedin} onLogout = {handleLogout}/>
    </>
  );
}

export default App;

// Without using useEffect how does it go in infinite loop?
// Because on every render this code:
//  if(storedLogin === "1"){
//     dispatchAuthStatus({
//       type:"LOGIN"
//     })
//   }
//   runs and it update the sate and again rerender and again this code run ... and so on

