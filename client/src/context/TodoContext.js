import {createContext} from "react";

export const TodoStatusContextList = createContext([]);
export const TodoListContext = createContext({
    todoList: [],
    dispatch: null
})