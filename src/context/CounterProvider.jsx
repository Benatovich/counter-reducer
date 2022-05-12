import { createContext, useContext, useReducer } from 'react'

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
        default:
            throw new Error(`Action type ${action.type} is not supported`);
    }
};

const StateContext = createContext();

export const CounterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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
