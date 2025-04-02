import {fetchDelete, fetchGet, fetchPost, fetchPut} from "./fetch.js";

const serverHost = import.meta.env.VITE_SERVER_HOST;
const TODO_API_URL = `${serverHost}/api/todo`;

export const getTodoStatusListAction = () => {
    return fetchGet(`${TODO_API_URL}/status`);
}

export const getTodoListAction = (status) => {
    return fetchGet(`${TODO_API_URL}/domain?status=${status}`);
}

export const addTodoAction = (todo) => {
    return fetchPost(`${TODO_API_URL}/domain`, todo)
}

export const removeTodoAction = (id) => {
    return fetchDelete(`${TODO_API_URL}/domain/${id}`)
}

export const saveTodoAction = (todo) => {
    return fetchPut(`${TODO_API_URL}/domain/${todo.id}`, todo)
}

export const addTodoFileAction = (todoFiles) => {
    return fetchPost(`${TODO_API_URL}/files`, todoFiles)
}

export const getTodoFilesAction = (id) => {
    return fetchGet(`${TODO_API_URL}/${id}/files`)
}