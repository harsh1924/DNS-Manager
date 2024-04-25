import { useDispatch } from "react-redux";
import Layout from "../../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { createDomainManually } from "../../Redux/domainSlice";

export default function UploadDomainManually() {

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
        });
    };

    const UploadDomainManually = async (event) => {
        event.preventDefault();
        if (!uploadData.name || !uploadData.type || !uploadData.ttl || !uploadData.data) {
            toast.error('All fields are mandatory');
        }

        const formData = new FormData();
        formData.append('name', uploadData.name);
        formData.append('type', uploadData.type);
        formData.append('ttl', uploadData.ttl);
        formData.append('data', uploadData.data);

        const res = await dispatch(createDomainManually(uploadData));

        setUploadData({
            name: '',
            type: '',
            ttl: 0,
            data: ''
        })
    };


    return (
        <Layout>
            <div className="flex items-center justify-center h-[90vh]">
                <form onSubmit={UploadDomainManually} className="flex flex-col justify-center gap-3 rounded-lg p-4 w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Upload Domains</h1>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className=" font-semibold">Name</label>
                        <input required type="text" className="px-2 bg-transparent py-1 border" id="name" name="name" value={uploadData.name} placeholder="enter domain name ex:google.com" onChange={handleUserInput} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="type" className=" font-semibold">Type</label>
                        <input required type="text" className="px-2 bg-transparent py-1 border" id="type" name="type" value={uploadData.type} placeholder="enter domain type" onChange={handleUserInput} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="ttl" className=" font-semibold">ttl</label>
                        <input required type="number" className="px-2 bg-transparent py-1 border" id="ttl" name="ttl" value={uploadData.ttl} placeholder="enter domain ttl" onChange={handleUserInput} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="data" className=" font-semibold">Address</label>
                        <input required type="text" className="px-2 bg-transparent py-1 border" id="data" name="data" value={uploadData.data} placeholder="enter domain ip address" onChange={handleUserInput} />
                    </div>

                    <button className="w-full bg-blue-600 text-white hover:bg-blue-500 transition-all ease-in-out duration-300 rounded-md py-2 font-semibold text-lg cursor-pointer" type="submit">
                        Upload Domain
                    </button>


                    <div className="text-center">
                        <Link to={'/upload'} className="link text-accent cursor-pointer">
                            Enter Details by Domain Name
                        </Link>
                    </div>

                    <div className="text-center">
                        <p className="link text-accent cursor-pointer" onClick={() => navigate('/') }>
                          Home Page
                        </p>
                    </div>
                </form>
            </div>
        </Layout>
    )
}