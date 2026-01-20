
import { createContext } from "react";

// Context provides a way to pass data through the component tree without having to pass props
// down manually at every level.

// React.createContext creates a Context object. When React renders a component that 
// subscribes to this Context object it will read the current context value from the closest 
// matching Provider above it in the tree.

// The default value is used when we don't wrap the component in .provider if we wrap them in 
// .provider then we must pass a value other wise it sends a message as undefined

const AppContext = createContext({
    loggedIn : false,
    login : () => {}
});

export default AppContext;