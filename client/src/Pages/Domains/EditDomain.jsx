import { useDispatch } from "react-redux";
import Layout from "../../Layout/Layout";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { editDomain, getAllDomains } from "../../Redux/domainSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditDomain() {

    const dispatch = useDispatch();

    const { id } = useParams();
    const [data, setData] = useState({
        name: '',
        type: '',
        ttl: 0,
        data: '',
        domainId: id
    });
    // { console.log(data.domainId) }
    const setText = (event) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!data.name || !data.type || !data.ttl || !data.data) {
            toast.error('All fields are required');
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('type', data.type);
        formData.append('ttl', data.ttl);
        formData.append('data', data.data);

        const newDomainData = [data.domainId, data];

        try {
            await dispatch(editDomain(newDomainData));
            await dispatch(getAllDomains());
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <Layout>
            <div className="flex items-center justify-center h-[100vh]">
                <form onSubmit={handleFormSubmit} className="flex flex-col justify-center gap-5 rounded-lg p-4 w-80 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Edit Domain Details</h1>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-lg font-semibold">Name
                        </label>
                        <input type="text" required name="name" id="name" placeholder="Enter domain name" className="px-2 bg-transparent py-1 border" value={data.name} onChange={setText} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="type" className="text-lg font-semibold">Type
                        </label>
                        <input type="text" required name="type" id="type" placeholder="Enter domain type" className="px-2 bg-transparent py-1 border" value={data.type} onChange={setText} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="ttl" className="text-lg font-semibold">ttl
                        </label>
                        <input type="number" required name="ttl" id="ttl" placeholder="Enter domain ttl" className="px-2 bg-transparent py-1 border" value={data.ttl} onChange={setText} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="data" className="text-lg font-semibold">IP Address
                        </label>
                        <input type="text" required name="data" id="data" placeholder="Enter domain ip address" className="px-2 bg-transparent py-1 border" value={data.data} onChange={setText} />
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-white text-lg cursor-pointer" type="submit">
                        Update</button>
                </form>
            </div>
        </Layout>
    )
}