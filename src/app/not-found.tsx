import { TbError404 } from "react-icons/tb";

export default function notFound() {
    return (
        <div className="mt-10">
            <div className="flex justify-center items-center">
                <span><TbError404 size={104} color="brown" /></span>
            </div>
            <div className="text-center font-bold">
                    <h1 className="text-3xl">Not Found</h1>
            </div>
            <p className="text-center">The page you requested was not found.</p>
        </div>
    )
}