import { ResultMessageProps } from "@/types/resultMessageProps";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";

export default function ResultMessage({ result }: ResultMessageProps) {
    if (!result) return null;

    return (
        <div className={`p-3 rounded-xl w-full flex items-center justify-center gap-x-2 text-sm ${result.status === 'error' ? 'text-danger-800 bg-danger-50' : 'text-success-800 bg-success-50'
            }`}>
            {result.status === "success" ? (
                <FaCheckCircle size={20} />
            ) : (
                <FaCircleExclamation size={20} />
            )}
            <p>
                {result.status === 'success' ? result.data : result.error as string}
            </p>
        </div>
    )
}