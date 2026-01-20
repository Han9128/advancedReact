import React, { useState } from "react";
import { useContext } from "react";
import AppContext from "./store/app-context";
import Login from "./components/Login/Login";
import AppProvider from "./store/AppProvider";

function App() {
  // const message = useContext(AppContext)
  
  return (
    <>
    <AppProvider>
      <h1>Hello Context</h1>
      <Login />
      </AppProvider>
    </>
  );
}

export default App;
