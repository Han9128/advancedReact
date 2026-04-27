



import React, { useState } from "react";
import "./CounterInput/counterInput.css"
import { useDispatch } from "react-redux";
import { counterActions } from "../store";

function SetCounter(){
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
   
    function handleChange(event){
        setInputValue(event.target.value);
    }

    function handleSetClick(){
        const newCount = Number(inputValue);
        dispatch(counterActions.set(newCount));
        setInputValue(""); // Clear input after setting
    }

    return (
        <div className="count-input">
            <label htmlFor="start-count">Enter a starting number:</label>
            <br></br>
            <input 
                type="number" 
                id="start-count" 
                value={inputValue}
                onChange={(event) => handleChange(event)}
            />
            <br></br>
            <button className="set" onClick={handleSetClick}>Set</button>
        </div>
    )
}

export default SetCounter;