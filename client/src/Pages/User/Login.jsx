import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Redux/authSlice";
import Layout from "../../Layout/Layout";
import { useState } from "react";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleUserInput = (event) => {
        const { name, value } = event.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error('All fields are required');
            return;
        }

        const res = await dispatch(login(loginData));
        setLoginData({
            email: '',
            password: ''
        });
    };

    return (
        <Layout>
<div className="flex items-center justify-center h-[90vh]">
<form onSubmit={handleLogin} className="flex flex-col justify-center gap-4 rounded-lg p-4 w-80 h-[26rem] shadow-[0_0_10px_black]">
<h1 className="font-bold text-center text-2xl">
    Login Page
</h1>
<div className="flex flex-col gap-1">
<label htmlFor="email" className="text-lg font-semibold">Email</label>
<input required type="text" name="email" id="email" placeholder="Enter Your Email" className="px-2 bg-transparent py-1 border" value={loginData.email} onChange={handleUserInput} />
</div>

<div className="flex flex-col gap-1">
<label htmlFor="password" className="text-lg font-semibold">Password</label>
<input required type="password" name="password" id="password" placeholder="Enter Your Password" className="px-2 bg-transparent py-1 border" value={loginData.password} onChange={handleUserInput} />
</div>

<button className="w-full bg-blue-600 hover:bg-blue-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-white text-lg cursor-pointer" type="submit">
    Login
</button>

<p className="text-center">
    Dont have an account? {" "}
    <Link to={'/user/signup'} className="link text-accent cursor-pointer">
        Create Account
    </Link>
</p>
</form>    
</div>            
        </Layout>
    )
}