import { useDispatch } from "react-redux";
import Layout from "../../Layout/Layout";
import { deleteDomain, getAllDomains } from "../../Redux/domainSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteDomain() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDomainDelete = async (id) => {
        const res = await dispatch(deleteDomain(id));
        if (res.payload.success) {
            navigate('/domains')
        }
    };

    

    return (
        <Layout>
            <div className="flex h-[90vh] items-center justify-center flex-col gap-4
            ">
                <p className="">Click below to delete the domain</p>
                <button className="btn btn-error text-white" onClick={() => handleDomainDelete(id)}>Delete</button>
            </div>
        </Layout>
    )
}