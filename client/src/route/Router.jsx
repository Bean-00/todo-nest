import { Route, Routes } from "react-router-dom";
import App from "../App.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import TodoListPage from "../pages/TodoListPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import MainPage from "../pages/MainPage.jsx";

export default function  Router() {

    return (
        <Routes>
            <Route path={"/"} element={<App/>}>
                <Route path={"/"} element={<MainPage/>} />
                <Route path={"todo"} element={<TodoListPage />} />
                <Route path={"login"} element={<LoginPage />} />
            </Route>
            <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
    )
}