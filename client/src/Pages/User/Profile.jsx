import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserData } from "../../Redux/authSlice";
import Layout from "../../Layout/Layout";
import { Link } from "react-router-dom";

export default function Profile() {
    const dispatch = useDispatch();
    const role = useSelector((state) => state?.auth?.role)

    const userData = useSelector((state) => state?.auth?.data);

    useEffect(() => {
        dispatch(getUserData());
    }, []);

    return (
        <Layout>
            <div className="flex flex-col min-h-[90vh] items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 w-72 shadow-[0_0_10px_black]">
                    <h3 className="text-xl font-semibold text-center capitalize">{userData.name}</h3>
                    <div className="grid grid-cols-2">
                        <p>Email: </p>
                        <p>{userData.email}</p>
                        <p>Role: </p>
                        <p>{userData.role}</p>
                    </div>
                </div>
                {role === "ADMIN" && (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Link to={'/upload'}>
                            <button className="btn btn-accent text-white">Upload Domains</button>
                        </Link>
                        
                    </div>
                )}
            </div>
        </Layout>
    )
}