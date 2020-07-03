import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";

const handlers = {
    [ADD_TODO]: (state, { title }) => ({
        ...state,
        toDos: [...state.toDos,
        {
            id: Date.now().toString(),
            title: title
        }]
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
    DEFAULT : state => state
}

export const toDoReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}