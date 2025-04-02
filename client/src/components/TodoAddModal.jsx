import {useContext, useState} from "react";
import {Button, Modal} from "flowbite-react";
import {addTodoAction} from "../service/TodoService.js";
import todoStore from "../store/TodoStore.js";
// import {TodoListContext} from "../context/TodoContext.js";

const TodoAddModal = ({openModal, onClose, status}) => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    // const {dispatch} = useContext(TodoListContext)
    const {addTodo} = todoStore()


    const clickAddBtn = async () => {
        const {isError, data} = await addTodoAction({title, content, statusCode: status})
        if (isError) {
            alert(data.errorMessage)
            return;
        }
        // dispatch({type: "addTodo", payload: data})
        addTodo(data)
        closeModal()
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    function initializeModal() {
        setTitle("");
        setContent("");
    }

    const closeModal = () => {

        initializeModal();
        onClose();
    }

    return (
        <>
            <Modal show={openModal} onClose={closeModal}>
                <Modal.Header>Todo Add</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="todo_title"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                할 일 제목</label>
                            <input type="text" id="todo_title"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="할 일 제목을 입력하세요" required onChange={handleTitleChange} value={title} autoComplete="off"/>
                        </div>
                        <div>
                            <label htmlFor="todo_content"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                할 일 내용</label>
                            <input type="text" id="todo_content"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="할 일 내용을 입력하세요" required onChange={handleContentChange} value={content} autoComplete="off"/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={clickAddBtn}>Add</Button>
                    <Button color="gray" onClick={closeModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default TodoAddModal;
