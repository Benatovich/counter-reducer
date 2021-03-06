import { createContext, useContext,
useReducer, useState, useEffect
} from 'react'

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

const StateContext = createContext();

export const CounterProvider = ({ children }) => {
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
    
    

    const handleIncrement = () => {
        dispatch({ type: 'INCREMENT' });
    }
    const handleDecrement = () => {
        dispatch({ type: 'DECREMENT' });
    }
    const handleReset = () => {
        dispatch({ type: 'RESET' });
    }

    // const handleColor = () => {
    //     state.count === 0 && dispatch({ type: 'COLOR_ZERO' });
    //     state.count > 0 && dispatch({ type: 'COLOR_POSITIVE' });
    //     state.count < 0 && dispatch({ type: 'COLOR_NEGATIVE' });
    // };
    
    return (
        <StateContext.Provider
            // value={{ state, count, increment, decrement, reset, currentColor }}
            value={{ state, handleIncrement, handleDecrement, handleReset }} >
                {children}
        </StateContext.Provider>
    );
};

export const useCustomState = () => {
    const context = useContext(StateContext);
    // context = { state, handleIncrement, handleDecrement, handleReset }

    if (context === undefined)
        throw new Error('useCustomState must be called from within a CounterProvider');

    return context;
}
