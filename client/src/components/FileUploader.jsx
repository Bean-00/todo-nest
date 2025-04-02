import {useRef} from "react";
import {uploadFilesAction} from "../service/FileService.js";

const FileUploader = ({children, multiple, accept = "image/*", onUploaded, onError}) => {

    const inputRef = useRef(null);

    const uploadFile = async (e) => {
        const files = e.target.files;
        const formData = new FormData();
        for (let file of files)
            formData.append('files', file)
        const {data, isError} = await uploadFilesAction(formData)
        if (isError) {
            console.log(isError)
            onError && onError(data)
            return;
        }

        if (onUploaded) {
            onUploaded(data)
            return;
        }
    }

    return (
        <>
            {inputRef &&
                <>
                    <input type={"file"}
                           ref={inputRef}
                           multiple={multiple}
                           accept={accept}
                           hidden={true}
                           onChange={uploadFile}/>
                    <div onClick={() => {
                        inputRef.current.click()
                    }}>
                        {children}
                    </div>
                </>
            }
        </>
    )
}

export default FileUploader