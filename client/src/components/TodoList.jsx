import {useEffect, useReducer, useState} from "react";
import {addTodoAction, getTodoListAction} from "../service/TodoService.js";
import TodoCard from "./TodoCard.jsx";
import LoadPannel from "./LoadPannel.jsx";
import TodoAddModal from "./TodoAddModal.jsx";
import TodoDetailModal from "./TodoDetailModal.jsx";
import todoStore from "../store/TodoStore.js";
// import TodoReducer from "../reducer/TodoReducer.js";

export default function TodoList({status}) {

    // const [todoList, dispatch] = useReducer(TodoReducer, [])
    const {todoList, setTodoList} = todoStore()
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);

    const getTodoList = async (status) => {
        setIsLoading(true);

        const {isError, data} = await getTodoListAction(status);
        setIsLoading(false);

        if (isError) {
            alert(`Error: ${data.errorMessage}`);
            return;
        }

        // dispatch({
        //     type: "setTodoList",
        //     payload: data,
        // })
        setTodoList(data);
    }

    const clickTodoCard = (todo) => {
        setCurrentTodo(todo)
        setIsOpenDetailModal(true)
    }

    useEffect(() => {
        getTodoList(status)
    }, [status]);
    return (
        // <TodoListContext.Provider value={{todoList, dispatch}}>
        //
        //     <LoadPannel isActive={isLoading}/>
        //     <div className="flex justify-end pb-3">
        //         <button type="button"
        //                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        //                 onClick={() => setIsOpenAddModal(true)}>
        //             Add
        //         </button>
        //     </div>
        //
        //     {!isLoading &&
        //         todoList.map(todo => {
        //             return (
        //                 <div key={todo.id} className={"flex justify-center"}>
        //                     <TodoCard todo={todo} className={"mt-5 cursor-pointer"} onClick={clickTodoCard}/>
        //                 </div>
        //             )
        //         })
        //     }
        //
        //     <TodoAddModal
        //         openModal={isOpenAddModal}
        //         onClose={() => {
        //             setIsOpenAddModal(false)
        //         }}
        //         status={status}/>
        //     {
        //         currentTodo &&
        //         <TodoDetailModal openModal={isOpenDetailModal} onClose={() => {
        //             setIsOpenDetailModal(false)
        //         }} todo={currentTodo}
        //                          status={{status}}/>
        //     }
        // </TodoListContext.Provider>

        <>

            <LoadPannel isActive={isLoading}/>
            <div className="flex justify-end pb-3">
                <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => setIsOpenAddModal(true)}>
                    Add
                </button>
            </div>

            {!isLoading &&
                todoList.map(todo => {
                    return (
                        <div key={todo.id} className={"flex justify-center"}>
                            <TodoCard todo={todo} className={"mt-5 cursor-pointer"} onClick={clickTodoCard}/>
                        </div>
                    )
                })
            }

            <TodoAddModal
                openModal={isOpenAddModal}
                onClose={() => {
                    setIsOpenAddModal(false)
                }}
                status={status}/>
            {
                currentTodo &&
                <TodoDetailModal openModal={isOpenDetailModal} onClose={() => {
                    setIsOpenDetailModal(false)
                }} todo={currentTodo}
                                 status={{status}}/>
            }
        </>


    )
}

