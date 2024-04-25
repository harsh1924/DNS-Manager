import { useNavigate } from "react-router-dom"

export default function NotFound() {

    const navigate = useNavigate();

    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white">
                404
            </h1>
            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            <button className="mt-5">
                <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
                    <span className="absolute transition-transform group-hover:translate-y-0 group-hover:translate-x-0 inset-0 translate-x-0.5 translate-y-0.5 bg-[#FF6A3d]" />
                    <span className="relative block px-8 py-3 border border-current bg-[#1A2238]" onClick={() => navigate(-1)}>
                        Go Back
                    </span>
                </a>
            </button>
        </main>
    )
}