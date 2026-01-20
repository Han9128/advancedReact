import React from "react";
import "./home.css"
function Home({isLoggedin, onLogin, onEmailChange, onPassChange, isLoginValid}){
    return (
        !isLoggedin &&
        <div className="home">
            <label>
                Email:
                <input id="email" type="email" placeholder="test@gmail.com" required onChange={(event) => onEmailChange(event)}></input>
            </label>
             <label>
                Password:
                <input id="password" type="password" placeholder="password" required onChange={(event)=>onPassChange(event)}></input>
            </label>
            <button className={`login-btn ${!isLoginValid && "disable"}`} onClick={onLogin}>Login</button>
        </div>
    )
}

export default Home;