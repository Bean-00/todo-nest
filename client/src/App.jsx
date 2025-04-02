import React, {useContext, useEffect, useReducer, useState} from 'react';
import {TodoNavbar} from "./components/TodoNavbar.jsx";
import {Outlet, useParams, useSearchParams} from "react-router-dom";
// import {UserContext} from "./context/UserContext.js";
import {getLoginUserAction} from "./service/SecurityService.js";
// import UserReducer from "./reducer/UserReducer.js";
import userStore from "./store/UserStore.js";
import {APIProvider} from "@vis.gl/react-google-maps";
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY


function App() {

    // const [loginUser, setLoginUser] = useState(null);
    // const [loginUser, dispatch] = useReducer(UserReducer, null);
    const {setUser} = userStore()
    const [searchParams, setSearchParams] = useSearchParams()

    const getLoginUser = async () => {
        if (searchParams?.get("atk")) {
           sessionStorage.setItem("atk", searchParams.get("atk"));
           searchParams.delete("atk");
           setSearchParams(searchParams)
        }

        const {isError, data} = await getLoginUserAction()

        if (isError) {
            alert(data.errorMessage)
            return
        }
        // dispatch({type: "setUser", payload: data});

        setUser(data)
    }


    useEffect(() => {
        getLoginUser();
    }, [searchParams])
    return (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <TodoNavbar/>
            <Outlet/>
        </APIProvider>
        // <UserContext.Provider value={{loginUser, dispatch}}>
        // <TodoNavbar/>
        // <Outlet/>
        // </UserContext.Provider>
    );
}

export default App;
