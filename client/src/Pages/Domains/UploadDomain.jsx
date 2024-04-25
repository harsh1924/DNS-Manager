import Layout from "../../Layout/Layout";
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from "react";
import { createDomain } from "../../Redux/domainSlice";

export default function UploadDomain() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const [uploadData, setUploadData] = useState({
        name: '',
        type: '',
        ttl: 0,
        data: ''
    });

    const handleUserInput = (event) => {
        const { name, value } = event.target;
        setUploadData({
            ...uploadData,
            [name]: value
        })
    };

    const uploadDomainAuto = async (event) => {
        event.preventDefault();
        if (!uploadData.name) {
            toast.error('Please Provide Domain Name');
        }

        const res = await dispatch(createDomain(uploadData));
        if (res?.payload?.success) {
            navigate('/upload')
        }

        setUploadData({
            name: '',
            type: '',
            ttl: 0,
            data: ''
        })
    }

    return (
        <Layout>
            <div className="flex items-center justify-center h-[90vh]">
                <form onSubmit={uploadDomainAuto} className="flex flex-col justify-center gap-3 rounded-lg p-4 w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Upload Domains</h1>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className=" font-semibold">Name</label>
                        <input required type="text" className="px-2 bg-transparent py-1 border" id="name" name="name" value={uploadData.name} placeholder="enter domain name ex:google.com" onChange={handleUserInput} />
                        <button className="w-full bg-blue-600 text-white hover:bg-blue-500 transition-all ease-in-out duration-300 rounded-md py-2 font-semibold text-lg cursor-pointer" type="submit">
                            Upload Domain
                        </button>
                    </div>
                    <div className="text-center flex flex-col">
                        <Link to={'/upload-manually'} className="link text-accent cursor-pointer">
                            Enter Details Manually
                        </Link>
                        <Link to={'/'} className="link text-accent cursor-pointer">
                            Home Page
                        </Link>
                    </div>
                </form>
            </div>
        </Layout>
    )
}