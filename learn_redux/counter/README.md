# Redux Complete Guide

## What is Redux?

Redux is a **state management library** that helps you manage application state in a centralized, predictable way. Instead of passing data through many component levels (prop drilling), Redux stores all data in one place that any component can access.

---

## Core Redux Concepts

### 1. **STORE** 🏪
The **single source of truth** for your entire application state.

```javascript
// Example store state:
{
  counter: 0,
  user: { name: 'John', age: 25 },
  todos: [{ id: 1, text: 'Learn Redux' }]
}
```

**Key Points:**
- There's only ONE store per application
- All components can access the store
- State is immutable (you don't modify it directly)

---

### 2. **ACTION** 📬
An **object that describes WHAT happened**. It tells Redux what to do.

```javascript
// Basic action
{ type: 'INCREASE' }

// Action with data (payload)
{ type: 'SET_COUNTER', payload: 10 }

// Using Redux Toolkit (auto-generated)
counterActions.increase()    // Creates action automatically
counterActions.set(100)      // With payload
```

**Action Structure:**
```javascript
{
  type: 'ACTION_NAME',      // Required: describes what happened
  payload: someData         // Optional: data to send
}
```

---

### 3. **REDUCER** ⚙️
A **pure function** that takes the current state and an action, then returns a NEW state.

```javascript
// Redux Toolkit version (easier)
const counterSlice = createSlice({
  name: 'counter',
  initialState: { counter: 0 },
  reducers: {
    increase(state) {
      state.counter++;  // Immer library allows "mutations"
    },
    set(state, action) {
      state.counter = action.payload;
    }
  }
});

// Traditional Redux (more verbose)
const reducer = (state = 0, action) => {
  switch(action.type) {
    case 'INCREASE':
      return state + 1;
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};
```

**Reducer Rules:**
- Pure function (same input = same output)
- No side effects (no API calls, no console.log)
- Never modify state directly (unless using Immer like Redux Toolkit)
- Return a new state

---

### 4. **DISPATCH** 📤
The method to **send actions to the reducer**. It triggers state changes.

```javascript
import { useDispatch } from 'react-redux';
import { counterActions } from './store';

function MyComponent() {
  const dispatch = useDispatch();
  
  // Dispatch an action
  dispatch(counterActions.increase());
  
  // Dispatch with payload
  dispatch(counterActions.set(100));
}
```

**Flow when you dispatch:**
1. `dispatch(action)` is called
2. Redux passes the action to the reducer
3. Reducer returns new state
4. Components using that state re-render with new data

---

### 5. **SELECTOR** 👀
A function to **read/extract data** from the Redux store.

```javascript
import { useSelector } from 'react-redux';

function Counter() {
  // Select specific data from store
  const counter = useSelector((state) => state.counter);
  
  return <h1>Count: {counter}</h1>;
}
```

**Selector Benefits:**
- Components subscribe to only the data they need
- Component re-renders only when that specific data changes
- Prevents unnecessary re-renders

---

## Redux Toolkit Shortcuts

Redux Toolkit (`createSlice`, `configureStore`) **simplifies Redux** significantly.

### Without Redux Toolkit (Traditional Redux - verbose)
```javascript
// Action types
const INCREASE = 'counter/INCREASE';
const SET = 'counter/SET';

// Action creators
export const increase = () => ({ type: INCREASE });
export const set = (payload) => ({ type: SET, payload });

// Reducer
const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREASE:
      return state + 1;
    case SET:
      return action.payload;
    default:
      return state;
  }
};

// Store
const store = createStore(counterReducer);
```

### With Redux Toolkit (Modern Redux - concise)
```javascript
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increase(state) { return state + 1; },
    set(state, action) { return action.payload; }
  }
});

export const { increase, set } = counterSlice.actions;
const store = configureStore({ reducer: counterSlice.reducer });
```

**Redux Toolkit automatically:**
- Generates action types and action creators
- Integrates Immer (allows "mutating" state)
- Sets up middleware and dev tools
- Reduces boilerplate code

---

## Complete Flow (Example)

```
User clicks "Increase" button
        ↓
dispatch(counterActions.increase())
        ↓
Redux receives action: { type: 'counter/increase' }
        ↓
Reducer processes: state.counter++
        ↓
New state: { counter: 1 }
        ↓
Component using useSelector sees new value
        ↓
Component re-renders with count = 1
```

---

## Using Redux in Components

### Pattern 1: Read from Store (Selector)
```javascript
import { useSelector } from 'react-redux';

function Counter() {
  const counter = useSelector((state) => state.counter);
  return <h1>{counter}</h1>;
}
```

### Pattern 2: Dispatch Actions
```javascript
import { useDispatch } from 'react-redux';
import { counterActions } from './store';

function IncreaseButton() {
  const dispatch = useDispatch();
  
  return (
    <button onClick={() => dispatch(counterActions.increase())}>
      Increase
    </button>
  );
}
```

### Pattern 3: Read AND Write
```javascript
function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  
  return (
    <>
      <p>Count: {counter}</p>
      <button onClick={() => dispatch(counterActions.increase())}>+</button>
    </>
  );
}
```

---

## Advanced Concepts

### Payload (Passing Data to Reducers)
```javascript
// Reducer with payload
set(state, action) {
  state.counter = action.payload;  // Extract from action.payload
}

// Dispatching with payload
dispatch(counterActions.set(100));  // 100 becomes action.payload
```

### Multiple Slices (Multi-Feature Store)
```javascript
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    user: userSlice.reducer,
    todos: todosSlice.reducer
  }
});

// Access nested state
const counter = useSelector((state) => state.counter.counter);
const userName = useSelector((state) => state.user.name);
```

### Selectors for Performance
```javascript
// Create reusable selectors
export const selectCounter = (state) => state.counter.counter;

// Use in components
const counter = useSelector(selectCounter);
```

---

## Common Mistakes ❌

| ❌ Wrong | ✅ Right |
|---------|---------|
| Modifying state directly | Use reducer to return new state |
| Calling reducer functions | Use dispatch() |
| Side effects in reducers | Put side effects in middleware |
| Accessing store from props | Use useSelector() |
| Creating new store each render | Create once at app start |
| Payload in action type | Put data in payload field |

---

## Redux vs Props

| Aspect | Props | Redux |
|--------|-------|-------|
| Data Flow | Parent → Child | Any component |
| Prop Drilling | Need to pass through multiple levels | Direct access via selector |
| State Management | Each component manages own state | Centralized global state |
| Use Case | Component-specific data | App-wide data |

---

## Quick Reference Cheatsheet

```javascript
// Setup
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

// Create slice
const slice = createSlice({
  name: 'feature',
  initialState: {},
  reducers: {
    action(state, action) { /* modify state */ }
  }
});

// Setup store
const store = configureStore({ reducer: slice.reducer });
export const { action } = slice.actions;

// In component - READ
const data = useSelector((state) => state.feature);

// In component - WRITE
const dispatch = useDispatch();
dispatch(action(payload));
```

---

## Resources
- Redux Official Docs: https://redux.js.org/
- Redux Toolkit: https://redux-toolkit.js.org/
- Redux DevTools Browser Extension: https://github.com/reduxjs/redux-devtools-extension
