import { useEffect, useState, useReducer } from 'react';
import styles from './Counter.css';
// import { state } from '../../context/CounterProvider'

const colors = {
  yellow: 'rgb(236, 222, 153)',
  green: 'rgb(52, 211, 153)',
  red: 'rgb(239, 68, 68)',
};

const initialState = { color: colors.yellow, count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
      case 'INCREMENT':
          return { ...state, count: state.count + 1};
      case 'DECREMENT':
          return { ...state, count: state.count - 1};
      case 'RESET':
          return initialState;
      // case 'COLOR_ZERO':
      //     return { ...state, color: colors.yellow };        
      default:
          throw new Error(`Action type ${action.type} is not supported`);
  }
};

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [count, setCount] = useState(0);
  const [currentColor, setCurrentColor] = useState(colors.yellow);


  
  useEffect(() => {
    if (state.count === 0) {
      setCurrentColor(colors.yellow);
    }

    if (state.count > 0) {
      setCurrentColor(colors.green);
    }

    if (state.count < 0) {
      setCurrentColor(colors.red);
    }
  }, [state]);

  // const increment = () => {
  //   setCount((prevState) => prevState + 1);
  // };

  // const decrement = () => {
  //   setCount((prevState) => prevState - 1);
  // };

  // const reset = () => {
  //   setCount(0);
  // };



  const handleIncrement = () => {
    dispatch({ type: 'INCREMENT' });
  }
  const handleDecrement = () => {
    dispatch({ type: 'DECREMENT' });
  }
  const handleReset = () => {
    dispatch({ type: 'RESET' });
  }

  return (
    <main className={styles.main}>
      <h1 style={{ color: currentColor }}>{state.count}</h1>
      <div>
        <button
          type="button"
          onClick={handleIncrement}
          aria-label="increment"
          style={{ backgroundColor: colors.green }}
        >
          Increment
        </button>
        <button
          type="button"
          onClick={handleDecrement}
          aria-label="decrement"
          style={{ backgroundColor: colors.red }}
        >
          Decrement
        </button>
        <button
          type="button"
          aria-label="reset"
          onClick={handleReset}
          style={{ backgroundColor: colors.yellow }}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
