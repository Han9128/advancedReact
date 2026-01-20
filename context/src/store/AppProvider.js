
import React, {useState} from "react";
import AppContext from "./app-context";

function AppProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = ()=>{
        setIsLoggedIn(true);
    }

    return <AppContext.Provider value={{loggedIn:isLoggedIn, login:handleLogin}}>
        {children}
    </AppContext.Provider>
}

export default AppProvider;