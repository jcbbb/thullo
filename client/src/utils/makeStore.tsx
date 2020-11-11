import * as React from 'react';
import {createContext, useReducer, useContext, useMemo} from 'react';

const makeStore = (reducer: any, initialState: any) => {
    const StoreContext = createContext(initialState);
    const DispatchContext = createContext(initialState);

    const StoreProvider: React.FC = ({children}) => {
        const [store, dispatch] = useReducer(reducer, initialState)

        const contextValue = useMemo(() => store, [store])
        const contextDispatch = useMemo(() => dispatch, [dispatch])

        return (
            <DispatchContext.Provider value={contextDispatch}>
                <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>
            </DispatchContext.Provider>
        )
    }

    const useStore = () => useContext(StoreContext)
    const useDispatch = () => useContext(DispatchContext);

    return [StoreProvider, useStore, useDispatch] as const;
}

export default makeStore;
