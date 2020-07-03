import React, { useReducer, useContext } from 'react';
import { ToDoContext } from './toDoContext';
import { toDoReducer } from './toDoReducer';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS } from '../types';
import { ScreenContext } from '../screen/screenContext';
import { Alert } from 'react-native';
import { Http } from '../../http';

export const ToDoState = ({ children }) => {
    const initialState = {
        toDos: [],
        loading: false,
        error: null
    }

    const { changeScreen } = useContext(ScreenContext);
    const [state, dispatch] = useReducer(toDoReducer, initialState);

    const addToDo = async title => {
        clearError();
        try {
            const data = await Http.post(
                'https://rn-todo-app-f7d50.firebaseio.com/toDos.json',
                { title }
            )
            dispatch({ type: ADD_TODO, title, id: data.name });
        } catch (e) {
            showError('Something was wrong, try again');
        }
    }

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
                    onPress: async () => {
                        changeScreen(null);
                        try {
                            await Http.delete(`https://rn-todo-app-f7d50.firebaseio.com/toDos/${id}.json`);
                            dispatch({ type: REMOVE_TODO, id });
                        } catch (e) {
                            showError('Something was wrong, try again');
                        }
                    }
                },
            ],
            { cancelable: false }
        )

    }

    const fetchToDos = async () => {
        showLoader();
        clearError();
        try {
            const data = await Http.get(
                'https://rn-todo-app-f7d50.firebaseio.com/toDos.json'
            );
            const toDos = Object.keys(data).map(key => ({ ...data[key], id: key }));
            dispatch({ type: FETCH_TODOS, toDos });
        } catch (e) {
            showError('Something was wrong, try again');
            console.log(e);
        } finally {
            hideLoader();
        }

    }

    const updateToDo = async (id, title) => {
        clearError();
        try {
            await Http.patch(
                `https://rn-todo-app-f7d50.firebaseio.com/toDos/${id}.json`,
                { title }
            );
            dispatch({ type: UPDATE_TODO, id, title });
        } catch (e) {
            showError('Something was wrong, try again');
            console.log(e);
        }
    }

    const showLoader = () => dispatch({ type: SHOW_LOADER });

    const hideLoader = () => dispatch({ type: HIDE_LOADER });

    const showError = error => dispatch({ type: SHOW_ERROR });

    const clearError = () => dispatch({ type: CLEAR_ERROR });

    return <ToDoContext.Provider
        value={{
            toDos: state.toDos,
            loading: state.loading,
            error: state.error,
            addToDo,
            removeToDo,
            updateToDo,
            fetchToDos
        }}>
        {children}
    </ToDoContext.Provider>
}