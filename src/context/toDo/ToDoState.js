import React, { useReducer, useContext } from 'react';
import { ToDoContext } from './toDoContext';
import { toDoReducer } from './toDoReducer';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types';
import { ScreenContext } from '../screen/screenContext';
import { Alert } from 'react-native';

export const ToDoState = ({ children }) => {
    const initialState = {
        toDos: [{ id: '1', title: 'Learn React' }]
    }

    const { changeScreen } = useContext(ScreenContext);
    const [state, dispatch] = useReducer(toDoReducer, initialState);

    const addToDo = title => dispatch({ type: ADD_TODO, title });
    const removeToDo = id => {
        const toDo = state.toDos.find(t => t.id === id);
        Alert.alert(
            'Removing element',
            `Do you really want to delete "${toDo.title}" ?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        changeScreen(null);
                        dispatch({ type: REMOVE_TODO, id });
                    }
                },
            ],
            { cancelable: false }
        )

    }
    const updateToDo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });

    return <ToDoContext.Provider
        value={{
            toDos: state.toDos,
            addToDo,
            removeToDo,
            updateToDo
        }}>
        {children}
    </ToDoContext.Provider>
}