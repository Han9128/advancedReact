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
  const [isLoginValid, setLoginValid] = useState(false);

  // const isLoginValid = email.length >5 && password.length>5;

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

  // Learn cleanup function
  // useEffect runs after render.
// Before running the effect again (when dependencies change) or on unmount,
// React first runs the cleanup function to cancel the previous effect
// (e.g., here first cleanup is running print before effect is running on every render. note that clean up run first on render 
// but while initially loading the page effect run first. Actually clean is one step behind effect when effect run first time
// that time clean up does not run it holds and when the component render then previous held clearn up run then the next effect run
// so clean up executes previous clean up on next render).
  useEffect(()=>{
    
    const timeOutId = setTimeout(()=>{
      console.log("effect is running")
      setLoginValid(email.length>5 && password.length > 5)
    },500)
    
    return ()=>{
      console.log("cleanup is running")
      clearTimeout(timeOutId)
    }

  },[email,password])
   
   
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

// what is sideffect and useeffect?
// Side effects are actions that interact with the outside world (API calls, timers, DOM).
// useEffect runs these side effects after render and cleans them up when needed.


// Without using useEffect how does it go in infinite loop?
// Because on every render this code:
//  if(storedLogin === "1"){
//     dispatchAuthStatus({
//       type:"LOGIN"
//     })
//   }
//   runs and it update the sate and again rerender and again this code run ... and so on

