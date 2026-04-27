
import React from "react";
import { memo } from "react";
import "./counterButton.css"


const CounterButton = memo(function CounterButton({onClick,children}){
    console.log("counter button rendered");
    return (
        <div className="buttons">
            <button className="counter-btn" onClick={onClick}>{children}</button>
            
        </div>
    )
});

export default CounterButton;