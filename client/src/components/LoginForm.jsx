import {useState} from "react";
import {loginByEmailAndPasswordAction} from "../service/SecurityService.js";

const serverHost = import.meta.env.VITE_SERVER_HOST;

const LoginForm = ({onSuccess, onFailure}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const login = async (event) => {
        event.preventDefault();
        if (!email?.trim()) {
            //이메일을 입력하세오옹
            alert('Please enter a valid email');
            return;
        }
        if (!password?.trim()) {
            alert('Please enter a password');
            return;
        }

        const {isError, data} = await loginByEmailAndPasswordAction({email, password, rememberMe});
        if (isError) {
            onFailure(data);
            return;
        }
        onSuccess(data);
    }

    const snsLogin = (registraionId) => {
        window.location.href = `${serverHost}/api/oauth2/authorization/${registraionId}`;
    }


    return (
        <form className="max-w-sm mx-auto w-full" onSubmit={login}>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    email</label>
                <input id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="아이디를 입력하세요"
                       autoComplete="off"/>
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    password</label>
                <input type="password" id="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder={"비밀번호를 입력하세요"}/>
            </div>
            <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value={rememberMe}
                           onChange={(event) => {
                               setRememberMe(event.target.checked)
                           }}
                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember
                    me</label>
            </div>
            <div className="flex gap-x-5">
                <button type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Submit
                </button>

                <button
                    className="text-black border bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={()=>snsLogin("google")}>
                    Google
                </button>

                <button
                    className="text-black bg-yellow-300 border hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={()=>snsLogin("kakao")}>
                   Kakao
                </button>
            </div>
        </form>
    )
}

export default LoginForm;