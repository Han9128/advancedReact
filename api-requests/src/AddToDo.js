import React, { useState,useRef } from "react";

function AddTodo(){

    const todoRef = useRef();

    async function handleSubmit(event){
        event.preventDefault();
        const data = todoRef.current.value;
        const todo = {
            content:data
        }
        try{

            const response = await fetch("https://react-post-request-2ca43-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(todo)
            })
            if(!response.ok) throw new Error();
            console.log("clicked",response)
        }catch(error){
            console.log("An Error Occured",error);
        }
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <label>
                Todo:
            <input type="text" placeholder="your todo here" ref={todoRef}>
            </input>
            </label>
            <button>Add</button>
        </form>
    )
}

export default AddTodo;