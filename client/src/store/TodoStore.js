import {create} from "zustand";

const TodoStore = create((set)=>({
    todoList: [],
    todoStatusList: [],
    setTodoList: (todoList) => set((state)=> ({ todoList, todoStatusList: state.todoStatusList })),
    addTodo: (todo) => set((state)=> ({todoList: [...state.todoList, todo], todoStatusList: state.todoStatusList})),
    removeTodo: (todoId) => set((state) => ({todoList: remove(state.todoList, todoId), todoStatusList: state.todoStatusList})),
    changeTodo: (newTodo) => set((state)=> ({todoList: update(state.todoList, newTodo), todoStatusList: state.todoStatusList})),
    setTodoStatusList: (todoStatusList) => set((state)=> ({todoStatusList, todoList: state.todoList }))
}))

const remove = (todoList, id) => {
    const idx = todoList.findIndex(todo => todo.id === id)
    if (idx < 0) {
        return;
    }
    return [...todoList.slice(0, idx), ...todoList.slice(idx + 1)]
}

const update = (todoList, data) => {
    const idx = todoList.findIndex(todo => todo.id === data.id)
    todoList[idx] = data
    return [...todoList]
}

export default TodoStore