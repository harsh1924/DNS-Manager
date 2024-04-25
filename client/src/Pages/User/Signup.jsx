import { useState } from "react";
import { createAccount } from '../../Redux/authSlice'
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";

export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleUserInput = (event) => {
        const { name, value } = event.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    };

    const createNewAccount = async (event) => {
        event.preventDefault();

        if (!signupData.name || !signupData.email || !signupData.password) {
            toast.error('All fields are required');
            return;
        }
        if (
            !signupData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ) {
            toast.error("Invalid email id");
            return;
        }

        const res = await dispatch(createAccount(signupData));
        if (res.payload.success) navigate('/user/login');

        setSignupData({
            name: '',
            email: '',
            password: ''
        });
    };

    return (
        <Layout>
            <div className="flex items-center justify-center h-[90vh]">
                <form onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 w-96 shadow-[0_0_10px_black]">
                    <h1 className="font-bold text-center text-2xl">Registration Page</h1>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className=" font-semibold">
                            Name
                        </label>
                        <input required type="text" name="name" id="name" placeholder="Enter Your Name" className="px-2 bg-transparent py-1 border" value={signupData.name} onChange={handleUserInput} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className=" font-semibold">
                            Email
                        </label>
                        <input required type="text" name="email" id="email" placeholder="Enter Your Email" className="px-2 bg-transparent py-1 border" value={signupData.email} onChange={handleUserInput} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                        <input required type="password" name="password" id="password" placeholder="Enter Your Password" className="px-2 bg-transparent py-1 border" value={signupData.password} onChange={handleUserInput} />
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg text-white cursor-pointer" type="submit">
                        Create Account
                    </button>

                    <p className="text-center">
                        Already have an account? {" "}
                        <Link to={'/user/login'} className="link text-accent cursor-pointer">
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </Layout>
    )
}