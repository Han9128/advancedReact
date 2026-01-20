
import React, { useContext } from "react";
import AppContext from "../../store/app-context";

function Login(){
    const {loggedIn, login,logout} = useContext(AppContext);
    return (
        loggedIn ? (<div>
            <h2>Welcome</h2>
            <button onClick={logout}>Logout</button>
            </div>)
         : <button onClick={login}>Login</button>
    )
}

export default Login;