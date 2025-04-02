import {Button, Modal} from "flowbite-react";
import {addTodoFileAction, getTodoFilesAction, removeTodoAction, saveTodoAction} from "../service/TodoService.js";
import {useContext, useEffect, useState} from "react";
import {TodoListContext} from "../context/TodoContext.js";
import todoStore from "../store/TodoStore.js";
import FileUploader from "./FileUploader.jsx";
import {FILE_API_URL, getImageAction} from "../service/FileService.js";

const TodoDetailModal = ({openModal, onClose, todo}) => {

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [title, setTitle] = useState(todo.title);
    // const {dispatch} = useContext(TodoListContext)
    const {removeTodo, changeTodo} = todoStore()
    const [files, setFiles] = useState([]);

    const closeModal = () => {
        initialize()
        onClose();
    }

    const remove = async () => {
        if (confirm("Really remove?")) {
            const {isError, data} = await removeTodoAction(todo.id)
            if (isError) {
                alert(`${data.errorMessage}`)
                return
            }
            // dispatch({
            //     type: "removeTodo",
            //     payload: todo.id
            // })
            removeTodo(todo.id)
            closeModal()
        }
    }

    const onEnter = (e) => {
        if (e.code !== "Enter")
            return;
        saveTodo({
            id: todo.id,
            title: title,
            content: todo.content,
            statusCode: todo.statusCode
        })
    }

    const saveTodo = async (editedTodo) => {
        const {isError, data} = await saveTodoAction(editedTodo)
        if (isError)
            alert(data.errorMessage)
        setIsEditingTitle(false);
        // dispatch( {
        //     type: "changeTodo",
        //     payload: data
        // })
        changeTodo(todo)
    }

    const getImage = async (file) => {
        const {data, isError} = await getImageAction(file?.uniqueFileName)
        if (isError) {
            console.error("!!!!: ", data.errorMessage)
            return
        }

        console.log(data)
        const url = `${FILE_API_URL}/image/${file?.uniqueFileName}`
        console.log(url)
    }

    useEffect(() => {
        initialize()
        getTodoFiles()
    }, [todo])

    const initialize = () => {
        setIsEditingTitle(false)
        setTitle(todo.title)
    }

    const getTodoFiles = async () => {
        const {data, isError} = await getTodoFilesAction(todo.id)
        if (isError) {
            alert(data.errorMessage)
            return
        }
        for (let f of data) {
            if (f.blob) continue
            const blob = await getImageBlob(f)
            f.blob = blob
        }
        setFiles(data)
    }

    const getImageBlob = async (file) => {
        const {data, isError} = await getImageAction(file?.uniqueFileName)
        if (isError) {
            alert(data.errorMessage)
            return
        }
        const reader = new FileReader()

        await new Promise((resolve, reject) => {
            reader.onload = resolve
            reader.onerror = reject
            reader.readAsDataURL(data)
        })

        return reader.result

    }

    const uploadTodoFiles = async (uploadedFiles) => {
        uploadedFiles.forEach(async (file) => {
            file.domainId = todo.id
            file.blob = await getImageBlob(file)
        })
        const {data, isError} = await addTodoFileAction(uploadedFiles)
        if (isError) {
            console.error(data.errorMessage)
            return;
        }
        setFiles([...files, ...uploadedFiles])
    }

    return (
        <>
            <Modal show={openModal} onClose={closeModal}>
                <Modal.Header>
                    {isEditingTitle ?
                        <div>
                            <input value={title} onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                                   onKeyUp={onEnter}/>
                        </div> :
                        <div onClick={() => {
                            setIsEditingTitle(true)
                        }}>
                            {title}
                        </div>}

                    <svg
                        onClick={remove}
                        style={{position: "absolute", top: "23px", right: "60px"}}
                        className="w-6 h-6 text-red-500 dark:text-white cursor-pointer" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                    </svg>

                </Modal.Header>
                <Modal.Body>
                    <div className={"h-[100px]"}>
                        {todo.content}
                    </div>
                    <h2 className={"text-xl"}>Item</h2>
                    <hr/>
                    <ul className={"mt-4"}>
                        <li className={"text-base text-gray-500 flex gap-x-1 cursor-pointer"}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            Add Item
                        </li>
                    </ul>
                    <h2 className={"text-xl mt-5"}>Files</h2>
                    <hr/>
                    <div className={"flex"}>
                        {files.map((file) => (
                            (<div className={"mt-3 mr-3 w-[100px] h-[100px] border-2 flex items-center justify-center"}
                                  key={file.fileId}>
                                {/*<img src={`${FILE_API_URL}/image/${file?.uniqueFileName}`} alt={file.fileName}/>*/}
                                <img src={file.blob} alt={file.fileName}/>
                            </div>)
                        ))}
                        <FileUploader multiple={true} onUploaded={uploadTodoFiles} onError={(data) => {
                            alert(data.errorMessage)
                        }}>
                            <div className={"mt-4 flex items-center justify-center"}>
                                <div className={"text-base text-gray-500 flex gap-x-1 cursor-pointer border p-5"}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                    첨부파일 선택
                                </div>
                            </div>
                        </FileUploader>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default TodoDetailModal