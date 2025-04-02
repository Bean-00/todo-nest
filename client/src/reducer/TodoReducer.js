const todoReducer = (state, action) => {
    switch (action.type) {
        case "setTodoList":
            return action.payload;
        case "addTodo":
            return [...state, action.payload];
        case "removeTodo":
            return removeTodo(state, action.payload);
        case "changeTodo":
            return changeTodo(state, action.payload)
        default:
            throw new Error("Unsupported action type");

    }
}

const removeTodo = (todoList, id) => {
    const idx = todoList.findIndex(todo => todo.id === id)
    if (idx < 0) {
        return;
    }
    return [...todoList.slice(0, idx), ...todoList.slice(idx + 1)]
}

const changeTodo = (todoList, data) => {
    const idx = todoList.findIndex(todo => todo.id === data.id)
    todoList[idx] = data
    return [...todoList]
}

export default todoReducer;