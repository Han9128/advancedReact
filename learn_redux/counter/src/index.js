import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App />
    </Provider>
);

// How does useState work? Does it inject all html again into DOM after rendering?
// When a state is changed then we know that our app re-render to reflect the change but it does not 
// inject all html again into DOM it efficiently change thosethings which have changed. Actually, react
// create two DOM on running website 1. Old DOM 2. virtual DOM. First react take the whole thing in virtual DOM after rendering 
// then it compares the virtual DOM with Old DOM and wherever it sees any difference update the Old DOM with the change appeared in virtual DOM. 
// This way react efficiently render websites 

// when we use some array or object and map them to create dynamic HTML elements then we get an error each map item 
// must have unique key. why this is required?
// As we know that react compares the Old DOM (real DOM) with virtaul DOM since in dynamic HTML entries reacts get confused how to compare 
// those items without any identity thats why react ask for a unique key so that it can efficiently compare and replace the changes. If we do not 
// give unique key then react re-renders the whole mapped jsx which is inefficient.

