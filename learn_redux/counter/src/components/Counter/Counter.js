
import React from "react";
import { memo } from "react";

const Counter = memo(function Counter({counter}){
    console.log("count rendered");
    return (
        <div className="Counter">
            <h3>Count : {counter}</h3>
        </div>
    )
});

export default Counter;