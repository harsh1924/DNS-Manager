import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/authSlice";

export default function Layout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    const handleLogout = async (event) => {
        event.preventDefault();
        const res = await dispatch(logout());
        if (res?.payload?.success) {
            navigate('/');
        }
    }

    return (
        <div>
            <div className="navbar py-4 bg-base-100 shadow-lg">
                <div className="flex-1">
                    <Link to={'/'} className="btn btn-ghost text-xl">DNS Manager</Link>
                </div>
                <div className="flex-none">
                    <div className="flex items-center justify-center gap-x-4">
                        <Link to={'/domains'}>
                            <button className="btn btn-accent">View Domains</button>
                        </Link>
                        {!isLoggedIn && (
                            <div className="gap-x-4 flex">
                                <Link to={'/user/signup'}>
                                    <button className="btn btn-outline btn-accent">Signup</button>
                                </Link>
                                <Link to={'/user/login'}>
                                    <button className="btn btn-outline btn-accent">Login</button>
                                </Link>
                            </div>
                        )}
                        {isLoggedIn && (
                            <div className="flex gap-x-4">
                                <Link to={'/user/me'}>
                                    <button className="btn btn-outline btn-accent">Profile</button>
                                </Link>
                                <Link onClick={handleLogout}>
                                    <button className="btn btn-outline btn-accent">Logout</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}