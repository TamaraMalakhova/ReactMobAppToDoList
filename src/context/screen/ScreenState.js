import React, {useReducer} from 'react';
import { ScreenContext } from './screenContext';
import { ScreenReducer } from './screenReducer';
import { CHANGE_SCREEN } from '../types';

export const ScreenState = ({ children }) => {
    const [state, dispatch] = useReducer(ScreenReducer, null);

    const changeScreen = id => dispatch({type: CHANGE_SCREEN, payload: id});

    return <ScreenContext.Provider value={{
        changeScreen,
        toDoId: state
    }}>{children}</ScreenContext.Provider>
}