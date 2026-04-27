import React, { useState, useCallback, useMemo} from "react";
import Counter from "./components/Counter/Counter";
import CounterButton from "./components/CounterButton/CounterButton";
import CounterInput from "./components/CounterInput/CounterInput";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "./store";
import SetCounter from "./components/setCounter";


function calc(count){
  // some heavy computation 
  console.log("heavy computation");
}

function App() {

  const counter = useSelector((state) => state.counter);
  console.log(counter);

  const dispatch = useDispatch();

  // const [count,setCount] = useState(0);
  // const [enteredCount, setEnteredCount] = useState(0);

  // suppose we have very heavy computation function in app.js in this case everytime our app renders 
  // this function will run and heavy computation will be done redundantly even the computation is same as previous value 
  // To avoid this we use useMemo which wraps a function inside and only run the function when given array of 
  // dependencies change otherwise it does not run 


  // const calculatedValue = useMemo(() => calc(count),[enteredCount]);

  // useCallback wraps the function and take an array of dependencies, the function wrapped inside useCallback
  // only change when dependencies passed in array change 
  const handleInc = useCallback(function handleInc(){
    // console.log(count);
    // setCount(count+1);
    dispatch(counterActions.increase());
  },[]);

  const handleDec = useCallback(function handleDec(){
    dispatch(counterActions.decrease());
    // setCount(count-1);
  },[]);

  // function handleChange(event){
  //   const newCount = Number(event.target.value);
  //   console.log(newCount);
  //   // setEnteredCount(newCount);
  // }

  // function handleEnteredCount(){
  //   // console.log(event.target);
  //   // console.log("input count")
  //   // setCount(enteredCount);
    
  // }
  // console.log("App rendered");

  // // function handleSet(newCount){
  //   dispatch(counterActions.set(newCount));
  // }

  return (
    <>
    {/* Counter does not render after using memo */}
    <Counter counter = {counter}/>
    {/* Here even I used memo in counterbutton but still re-renders because functions 
    handleInc and handleDec is newly created. memo check equality by reference of props in case 
    of functions javascript create new reference on every run so it renders. TO fix this we use useCallback */}

    <CounterButton onClick = {handleInc}> Increase </CounterButton>
    <CounterButton onClick = {handleDec} > Decrease </CounterButton>

    {/* Here we can see that on every change of input the app is rendering because of enteredCount state */}
    {/* Though nothing is chaning in our UI so it is is rendering redundantly. This can be fixed using two methods */}
    {/* 1. Use memo in components which we dont want to render */}
    {/* 2. Structure our component in such a way that only concerned components rerender like 
    here we can move state of enteredCount to CounterInput component itself  */}

    {/* <CounterInput onClick = {handleEnteredCount} onChange={handleChange} /> */}
     
    <SetCounter/>

    </>
  );
}

export default App;
