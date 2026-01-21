import React, { useEffect, useState,useCallback } from "react";
import AddTodo from "./AddToDo";

function App() {
  const [isLoading,setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isError, setIsError] = useState(false);
  // function handleClick(){
  //   setIsLoading(true);
  //   fetch("https://jsonplaceholder.typicode.com/todos/")
  // .then((response)=>{
  //   if(!response.ok){
  //     throw new Error();
  //   }
  //     return response.json();
    
  // })
  // .then((data)=>{
  //   setTodos(data);
  //   setIsLoading(false);
  //   console.log(todos);
  // })
  // .catch((error)=>{
  //   // console.log("error",error);
  //   setIsError(true);
  //   setIsLoading(false);
    
  // })
  // }

  // async await version of the above code:
  const handleClick = async ()=>{
    setIsLoading(true);
    try{
      const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
      const data = await response.json();
      if(!response.ok){
        throw new Error();
      }
      setTodos(data);
      setIsLoading(false);
    }catch(error){
      // console.log("error");
      setIsLoading(false);
      setIsError(true);
    }

  }

  // if we want that first time page load all todos fetched then we can use useEffect
  
  // If we don't put this function in callback then on every render a new reference of function is created 
  // and since it is passed as dependency in useEffect so it thinks it has changes and goes in infinite loop.

  // const handleClick = useCallback(function (){
  //   setIsLoading(true);
  // },[]);

  // useEffect(function (){
  //   setIsLoading(true);
  //   fetch("https://jsonplaceholder.typicode.com/todos/")
  // .then((response)=>{
  //   if(!response.ok){
  //     throw new Error();
  //   }
  //     return response.json();
    
  // })
  // .then((data)=>{
  //   setTodos(data);
  //   setIsLoading(false);
  //   console.log(todos);
  // })
  // .catch((error)=>{
  //   // console.log("error",error);
  //   setIsError(true);
  //   setIsLoading(false);
    
  // })
  // },[handleClick])

  return (
    <>
    {!isLoading && !isError && todos.length === 0?
    <button onClick={handleClick}>Fetch Todos</button>: isLoading?
    <p>Loading....</p>:
    <div>
       {isError ? <h2 style={{color:"red"}}>Something Went Wrong</h2>:
       <>
      <h2>Todos:</h2>
      <ul>
        {todos.map((todo,index)=> <li key={index}>{todo.title}</li>)}
      </ul>
      </>}
    </div>
}
  <AddTodo />
    </>
  );
}

export default App;
