
import React from "react";
import { memo } from "react";

const Counter = memo(function Counter({count}){
    console.log("count rendered");
    return (
        <div className="Counter">
            <h3>Count : {count}</h3>
        </div>
    )
});

export default Counter;