import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Layout from "../../Layout/Layout";
import { getAllDomains } from "../../Redux/domainSlice";
import { Link, useNavigate } from "react-router-dom";

export default function ViewDomains() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { domainData } = useSelector((state) => state.domain);

    useEffect(() => {
        (async () => {
            await dispatch(getAllDomains())
        })();
    }, []);

    return (
        <Layout>
            <div className="w-[90vw] pt-12 min-h-[90vh] pl-20 flex flex-col flex-wrap gap-10 ">
                <h1 className="text-3xl text-center font-semibold">
                    All Domains
                </h1>
                <Link className="w-full flex justify-end items-center">
                    <button onClick={() => navigate(-1)} className="btn btn-outline btn-accent">Go Back</button>
                </Link>

                <div className="mb-10 text-black flex flex-wrap gap-14 flex-col text-xl table">
                    <thead>
                        <tr className="flex text-md
                         w-full justify-around items-center border">
                            <th>Name</th>
                            <th> Type</th>
                            <th>ttl</th>
                            <th>IP Address</th>
                            <th>{" "}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {domainData[0]?.domains?.map((element) => {
                            return (
                                <div key={element._id} className="text-black flex justify-around">
                                    <tbody className="w-full">
                                        <tr className="flex  text-[12px] w-full border justify-around items-center">
                                            <td className=" text-left w-[100px]">{element.name}
                                            </td>
                                            <td className=" text-center w-[100px]">{element.type}</td>
                                            <td className=" text-center w-[100px]">{element.ttl}</td>
                                            <td className=" text-center w-[100px]">{element.data}</td>
                                            {/* <td className=" text-center w-[100px]">{element._id}</td> */}
                                            <td className="flex text-md text-center justify-around w-[100px]"><MdEdit className=" cursor-pointer" onClick={() => navigate(`/edit/${element._id}`)}/> <MdDelete className=" cursor-pointer" onClick={() => navigate(`/delete/${element._id}`)}/> </td>
                                        </tr>
                                    </tbody>
                                </div>
                            )
                        })}
                    </tbody>
                </div>

            </div>
        </Layout>
    )
}