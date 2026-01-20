
import React, {useReducer, useState} from "react";
import AppContext from "./app-context";

function authReducer(state,action){
    switch (action.type){
        case "LOGIN":
            return {
                isLoggedIn:true
            }
        case "LOGOUT":
            return {
                isLoggedIn:false
            }
        default:
            return state;
    }
}

const initialStatus = {
    isLoggedIn:false
}

function AppProvider({children}){
    const [authStatus, dispatchAuthStatus] = useReducer(authReducer,initialStatus)
    // const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleLogin = ()=>{
        dispatchAuthStatus({type:"LOGIN"})
        // setIsLoggedIn(true);
    }

    const handleLogout = ()=>{
        dispatchAuthStatus({type:"LOGOUT"})
    }

    return <AppContext.Provider value={{loggedIn:authStatus.isLoggedIn, login:handleLogin,logout:handleLogout}}>
        {children}
    </AppContext.Provider>
}

export default AppProvider;

// useReducer is similar to useState hook it is used for custom and complex state logic. If our state is 
// very complex and have multiple things then it is recommended to use useReducer

// The useReducer Hook accepts three arguments.

// useReducer(reducer, initialState, init)

// The reducer function contains your custom state logic and the initialState can be a simple value, but generally will contain an object. 
// The init argument is optional and is used to initialize the state.

// The useReducer Hook returns the current state and a dispatch method.