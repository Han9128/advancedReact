import React from "react";
import "./counterInput.css"

function CounterInput({onChange,onClick}){
    function handleChange(event){
        onChange(event);
    }

    return (
        <div className="count-input">
            <label for= "start-count">Enter a starting number:</label>
            <br></br>
            <input type="number" id = "start-count" onChange={(event) => handleChange(event)}/>
            <br></br>
            <button className="set" onClick={onClick}>Set</button>
        </div>
    )
}

export default CounterInput;