import {_fetch, fetchGet} from "./fetch.js";

const serverHost = import.meta.env.VITE_FILE_SERVER_HOST;
export const FILE_API_URL = `${serverHost}/api/files`;

export const uploadFilesAction = (formData) => {
    return _fetch(FILE_API_URL,
        {method: "Post", credentials: 'include', body: formData})
}

export const getImageAction = (uniqueFileName) => {
    return fetchGet(`${FILE_API_URL}/image/${uniqueFileName}`, true)
}