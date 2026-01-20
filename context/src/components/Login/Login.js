
import React, { useContext } from "react";
import AppContext from "../../store/app-context";

function Login(){
    const {loggedIn, login} = useContext(AppContext);
    return (
        loggedIn? <h2>Welcome</h2> : <button onClick={login}>Login</button>
    )
}

export default Login;