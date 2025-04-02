import {useContext, useState} from "react";
import {loginByEmailAndPasswordAction} from "../service/SecurityService.js";
import LoginForm from "../components/LoginForm.jsx";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../context/UserContext.js";
import userStore from "../store/UserStore.js";

const LoginPage = () => {

    // const {dispatch} = useContext(UserContext);
    const {setUser} = userStore()
    const navigate = useNavigate();

    const loginSuccess = (user) => {
        // dispatch({type: "setUser", payload: user});
        setUser(user)
        navigate("/todo");
    }

    return (
        <div className={"flex justify-center mt-7"}>
            <LoginForm onSuccess={loginSuccess} onFailure={(error) => alert("로그인 실패")}/>
        </div>

    )
}

export default LoginPage;