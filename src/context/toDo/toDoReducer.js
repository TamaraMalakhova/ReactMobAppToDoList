import {
    ADD_TODO, REMOVE_TODO, UPDATE_TODO, SHOW_LOADER, HIDE_LOADER,
    CLEAR_ERROR, SHOW_ERROR, FETCH_TODOS
} from "../types";

const handlers = {
    [ADD_TODO]: (state, { title, id }) => ({
        ...state,
        toDos: [...state.toDos, { id, title }]
    }),
    [REMOVE_TODO]: (state, { id }) => ({
        ...state,
        toDos: state.toDos.filter(toDo => toDo.id !== id)
    }),
    [UPDATE_TODO]: (state, { id, title }) => ({
        ...state, toDos: state.toDos.map(toDo => {
            if (toDo.id === id) {
                toDo.title = title;
            }
            return toDo;
        })
    }),
    [SHOW_LOADER]: state => ({ ...state, loading: true }),
    [HIDE_LOADER]: state => ({ ...state, loading: false }),
    [CLEAR_ERROR]: state => ({ ...state, error: null }),
    [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
    [FETCH_TODOS]: (state, { toDos }) => ({ ...state, toDos }),
    DEFAULT: state => state
}

export const toDoReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}