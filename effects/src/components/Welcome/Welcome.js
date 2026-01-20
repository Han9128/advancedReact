
import React from "react";
import "./welcome.css"

function Welcome({isLoggedin, onLogout}){
    console.log("Welcome", isLoggedin);
    return (
        isLoggedin && 
        (<div className="welcome">
            <h1>
                Welcome
            </h1>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>)
    )
}

export default Welcome;